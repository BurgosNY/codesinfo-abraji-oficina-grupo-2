import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the live PubMed search and keeps the editorial demo separate", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /PUBMED AO VIVO/);
  assert.match(html, /Buscar no PubMed/);
  assert.match(html, /DEMONSTRAÇÃO EDITORIAL/);
  assert.match(html, /ALEGAÇÃO SIMULADA/);
  assert.doesNotMatch(html, /busca foi aproximada|codex-preview|SkeletonPreview/);
});

test("rejects PubMed searches that are too short without calling the upstream API", async () => {
  const response = await render("/api/pubmed?q=ab");
  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.match(payload.error, /ao menos 3 caracteres/);
});

test("returns normalized PubMed records from the official API responses", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("esearch.fcgi")) {
      return Response.json({ esearchresult: { count: "42", idlist: ["39324502"] } });
    }
    if (url.includes("efetch.fcgi")) {
      return new Response(`<?xml version="1.0"?>
        <PubmedArticleSet>
          <PubmedArticle>
            <MedlineCitation>
              <PMID>39324502</PMID>
              <Article>
                <Journal>
                  <JournalIssue><PubDate><Year>2024</Year><Month>Sep</Month></PubDate></JournalIssue>
                  <Title>Current Oncology</Title>
                </Journal>
                <ArticleTitle>Use of Antiperspirant Products &amp; Risk of Breast Canc&#xe9;r</ArticleTitle>
                <Abstract><AbstractText Label="CONCLUSIONS">No association was found.</AbstractText></Abstract>
                <AuthorList><Author><ForeName>Th&#xe1;o</ForeName><LastName>Trinh</LastName></Author></AuthorList>
                <Language>eng</Language>
                <PublicationTypeList><PublicationType>Meta-Analysis</PublicationType></PublicationTypeList>
              </Article>
            </MedlineCitation>
            <PubmedData><ArticleIdList><ArticleId IdType="doi">10.3390/example</ArticleId></ArticleIdList></PubmedData>
          </PubmedArticle>
        </PubmedArticleSet>`, { headers: { "content-type": "application/xml" } });
    }
    throw new Error(`Unexpected upstream request: ${url}`);
  };

  try {
    const response = await render("/api/pubmed?q=breast%20cancer");
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.query, "breast cancer");
    assert.equal(payload.total, 42);
    assert.equal(payload.articles.length, 1);
    assert.deepEqual(payload.articles[0], {
      pmid: "39324502",
      title: "Use of Antiperspirant Products & Risk of Breast Cancér",
      abstract: "CONCLUSIONS: No association was found.",
      authors: ["Tháo Trinh"],
      authorsTruncated: false,
      journal: "Current Oncology",
      publishedAt: "Sep 2024",
      publicationTypes: ["Meta-Analysis"],
      languages: ["eng"],
      doi: "10.3390/example",
      url: "https://pubmed.ncbi.nlm.nih.gov/39324502/",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
