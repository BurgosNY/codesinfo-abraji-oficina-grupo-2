import { XMLParser } from "fast-xml-parser";

export const dynamic = "force-dynamic";

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const RESULT_LIMIT = 8;
const REQUEST_TIMEOUT_MS = 12_000;

type XmlRecord = Record<string, unknown>;

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseTagValue: false,
  trimValues: true,
  processEntities: true,
});

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function flattenText(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(flattenText).filter(Boolean).join(" ");
  if (typeof value === "object") {
    return Object.entries(value as XmlRecord)
      .filter(([key]) => !key.startsWith("@_"))
      .map(([, child]) => flattenText(child))
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

function cleanText(value: unknown): string {
  const decoded = flattenText(value)
    .replace(/&#x([0-9a-f]+);/gi, (match, code) => {
      const point = Number.parseInt(code, 16);
      return Number.isSafeInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    })
    .replace(/&#([0-9]+);/g, (match, code) => {
      const point = Number.parseInt(code, 10);
      return Number.isSafeInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    })
    .replace(/&(amp|lt|gt|quot|apos);/g, (match, entity) => {
      const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
      return entities[entity] ?? match;
    });
  return decoded.replace(/\s+/g, " ").trim();
}

function getAttribute(value: unknown, name: string): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const attribute = (value as XmlRecord)[`@_${name}`];
  return typeof attribute === "string" || typeof attribute === "number" ? String(attribute) : "";
}

function formatPublicationDate(article: XmlRecord): string {
  const journal = article.Journal as XmlRecord | undefined;
  const issue = journal?.JournalIssue as XmlRecord | undefined;
  const publicationDate = issue?.PubDate as XmlRecord | undefined;
  const articleDate = asArray(article.ArticleDate as XmlRecord | XmlRecord[] | undefined)[0];
  const source = articleDate ?? publicationDate;
  if (!source) return "Data não informada";

  const medlineDate = cleanText(source.MedlineDate);
  if (medlineDate) return medlineDate;

  const parts = [source.Day, source.Month, source.Year].map(cleanText).filter(Boolean);
  return parts.length ? parts.join(" ") : "Data não informada";
}

function parseAbstract(citation: XmlRecord, article: XmlRecord): string {
  const abstract = article.Abstract as XmlRecord | undefined;
  let blocks = asArray(abstract?.AbstractText);

  if (!blocks.length) {
    const otherAbstract = asArray(citation.OtherAbstract as XmlRecord | XmlRecord[] | undefined)[0];
    blocks = asArray(otherAbstract?.AbstractText);
  }

  return blocks
    .map((block) => {
      const label = getAttribute(block, "Label");
      const text = cleanText(block);
      return label && text ? `${label}: ${text}` : text;
    })
    .filter(Boolean)
    .join("\n\n");
}

function parseArticle(rawArticle: XmlRecord) {
  const citation = (rawArticle.MedlineCitation ?? {}) as XmlRecord;
  const article = (citation.Article ?? {}) as XmlRecord;
  const journal = (article.Journal ?? {}) as XmlRecord;
  const journalTitle = cleanText(journal.Title) || cleanText(journal.ISOAbbreviation);

  const authorRecords = asArray(
    ((article.AuthorList ?? {}) as XmlRecord).Author as XmlRecord | XmlRecord[] | undefined,
  );
  const authors = authorRecords
    .map((author) => {
      const collectiveName = cleanText(author.CollectiveName);
      if (collectiveName) return collectiveName;
      return [cleanText(author.ForeName), cleanText(author.LastName)].filter(Boolean).join(" ");
    })
    .filter(Boolean);

  const publicationTypes = asArray(
    ((article.PublicationTypeList ?? {}) as XmlRecord).PublicationType,
  ).map(cleanText).filter(Boolean);

  const pubmedData = (rawArticle.PubmedData ?? {}) as XmlRecord;
  const articleIds = asArray(((pubmedData.ArticleIdList ?? {}) as XmlRecord).ArticleId);
  const doiRecord = articleIds.find((item) => getAttribute(item, "IdType") === "doi");
  const pmid = cleanText(citation.PMID);

  return {
    pmid,
    title: cleanText(article.ArticleTitle) || "Título não informado",
    abstract: parseAbstract(citation, article),
    authors,
    authorsTruncated: authors.length > 6,
    journal: journalTitle || "Periódico não informado",
    publishedAt: formatPublicationDate(article),
    publicationTypes,
    languages: asArray(article.Language).map(cleanText).filter(Boolean),
    doi: cleanText(doiRecord),
    url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
  };
}

function parsePubmedArticles(xml: string) {
  const parsed = xmlParser.parse(xml) as XmlRecord;
  const articleSet = (parsed.PubmedArticleSet ?? {}) as XmlRecord;
  return asArray(articleSet.PubmedArticle as XmlRecord | XmlRecord[] | undefined)
    .map(parseArticle)
    .filter((article) => article.pmid);
}

async function fetchPubmed(url: URL) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers: { Accept: "application/json, application/xml;q=0.9" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams.get("q")?.replace(/\s+/g, " ").trim() ?? "";

  if (query.length < 3) {
    return Response.json(
      { error: "Digite ao menos 3 caracteres para pesquisar no PubMed." },
      { status: 400 },
    );
  }
  if (query.length > 180) {
    return Response.json(
      { error: "A busca deve ter no máximo 180 caracteres." },
      { status: 400 },
    );
  }

  try {
    const searchUrl = new URL(`${EUTILS_BASE}/esearch.fcgi`);
    searchUrl.search = new URLSearchParams({
      db: "pubmed",
      retmode: "json",
      retmax: String(RESULT_LIMIT),
      sort: "relevance",
      term: query,
      tool: "evidencia_em_pauta",
    }).toString();

    const searchResponse = await fetchPubmed(searchUrl);
    if (!searchResponse.ok) throw new Error(`PubMed ESearch: ${searchResponse.status}`);
    const searchPayload = (await searchResponse.json()) as {
      esearchresult?: { count?: string; idlist?: string[] };
    };
    const ids = searchPayload.esearchresult?.idlist ?? [];
    const total = Number(searchPayload.esearchresult?.count ?? 0);

    if (!ids.length) {
      return Response.json(
        { query, total, articles: [], requestedAt: new Date().toISOString() },
        { headers: { "Cache-Control": "public, max-age=60, s-maxage=900" } },
      );
    }

    const fetchUrl = new URL(`${EUTILS_BASE}/efetch.fcgi`);
    fetchUrl.search = new URLSearchParams({
      db: "pubmed",
      retmode: "xml",
      id: ids.join(","),
      tool: "evidencia_em_pauta",
    }).toString();

    const recordsResponse = await fetchPubmed(fetchUrl);
    if (!recordsResponse.ok) throw new Error(`PubMed EFetch: ${recordsResponse.status}`);
    const articles = parsePubmedArticles(await recordsResponse.text());

    return Response.json(
      { query, total, articles, requestedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=900, stale-while-revalidate=3600" } },
    );
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return Response.json(
      {
        error: timedOut
          ? "O PubMed demorou para responder. Tente novamente em instantes."
          : "Não foi possível consultar o PubMed agora. Tente novamente em instantes.",
      },
      { status: 502 },
    );
  }
}
