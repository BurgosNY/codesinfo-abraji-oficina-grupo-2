"use client";

import { FormEvent, useState } from "react";

const cases = {
  "câncer de mama": {
    shortLabel: "Desodorante e câncer",
    claim: "Desodorante antitranspirante causa câncer de mama",
    origin: "Alegação criada para demonstrar o fluxo",
    date: "sem data ou URL",
    assessment: "Os registros selecionados contradizem a alegação",
    confidence: "Provisória",
    why: "Uma meta-análise de sete estudos caso-controle e um estudo populacional não encontraram associação. A meta-análise ressalta que estudos prospectivos ainda são necessários; isso impede tratar o resultado como prova de risco absolutamente zero.",
    articles: [
      { title: "Use of Antiperspirant Products and Risk of Breast Cancer: A Meta-Analysis of Case-Control Studies", year: "2024", method: "Meta-análise de 7 estudos caso-controle · PMID 39324502", authors: "Trinh TTK; Myung SK; Tran TH; Choi KS", signal: "contradiz", url: "https://pubmed.ncbi.nlm.nih.gov/39324502/" },
      { title: "Antiperspirant use and the risk of breast cancer", year: "2002", method: "Estudo caso-controle populacional: 813 casos e 793 controles · PMID 12381712", authors: "Mirick DK; Davis S; Thomas DB", signal: "contradiz", url: "https://pubmed.ncbi.nlm.nih.gov/12381712/" },
    ],
    pitch: "Por que o boato sobre desodorantes e câncer de mama persiste após décadas de estudos sem associação? A pauta pode explicar o que estudos caso-controle conseguem — e não conseguem — demonstrar e por que ausência de associação não é prova de risco zero.",
    researchers: [
      { name: "Thao Thi Kim Trinh", inst: "National Cancer Center Graduate School of Cancer Science and Policy, Coreia do Sul", area: "Controle populacional do câncer", score: 92, reason: "Primeira autora da meta-análise mais recente selecionada; vínculo informado pelo PubMed e aderência direta ao tema." },
      { name: "Seung-Kwon Myung", inst: "National Cancer Center, Coreia do Sul", area: "Epidemiologia e prevenção", score: 86, reason: "Coautor da meta-análise selecionada. A pontuação demonstra pertinência, não autoridade definitiva." },
    ],
  },
  "curas naturais": {
    shortLabel: "Açúcar e tumores",
    claim: "Cortar todo o açúcar impede um tumor de crescer",
    origin: "Alegação criada para demonstrar o fluxo",
    date: "sem data ou URL",
    assessment: "A alegação simplifica uma evidência inconclusiva",
    confidence: "Provisória",
    why: "A literatura distingue consumo de açúcar, adiposidade, risco de câncer e tratamento. Os registros selecionados não sustentam a promessa de que eliminar açúcar interrompa um tumor.",
    articles: [
      { title: "Consumption of Sugars, Sugary Foods, and Sugary Beverages in Relation to Cancer Risk", year: "2018", method: "Revisão sistemática de 37 coortes prospectivas · PMID 29801420", authors: "Makarem N; Bandera EV; Nicholson JM; Parekh N", signal: "inconclusivo", url: "https://pubmed.ncbi.nlm.nih.gov/29801420/" },
      { title: "Dietary sugar consumption and health: umbrella review", year: "2023", method: "Revisão guarda-chuva de 73 meta-análises · PMID 37019448", authors: "Huang Y et al.", signal: "não sustenta a promessa", url: "https://pubmed.ncbi.nlm.nih.gov/37019448/" },
    ],
    pitch: "Da recomendação nutricional à falsa promessa terapêutica: como conteúdos online transformam associações entre dieta e risco em uma suposta cura do câncer? Separar prevenção, metabolismo e tratamento.",
    researchers: [
      { name: "Nour Makarem", inst: "Columbia University Medical Center (vínculo no registro de 2018)", area: "Nutrição e epidemiologia", score: 90, reason: "Primeira autora da revisão sistemática selecionada; vínculo atual deve ser confirmado pela redação." },
      { name: "Niyati Parekh", inst: "NYU School of Global Public Health (vínculo no registro de 2018)", area: "Saúde populacional", score: 81, reason: "Coautora da revisão selecionada. A lista não representa um censo de especialistas." },
    ],
  },
};

type Topic = keyof typeof cases;
type Tab = "analysis" | "science" | "sources";
type PubmedArticle = {
  pmid: string;
  title: string;
  abstract: string;
  authors: string[];
  authorsTruncated: boolean;
  journal: string;
  publishedAt: string;
  publicationTypes: string[];
  languages: string[];
  doi: string;
  url: string;
};
type PubmedSearch = {
  query: string;
  total: number;
  articles: PubmedArticle[];
  requestedAt: string;
};

const languageNames: Record<string, string> = { eng: "inglês", por: "português", spa: "espanhol", fre: "francês" };

export default function Home() {
  const [query, setQuery] = useState("câncer de mama");
  const [search, setSearch] = useState<PubmedSearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState<Topic>("câncer de mama");
  const [tab, setTab] = useState<Tab>("analysis");
  const data = cases[topic];

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/pubmed?q=${encodeURIComponent(query)}`);
      const payload = (await response.json()) as PubmedSearch & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Não foi possível realizar a busca.");
      setSearch(payload);
    } catch (searchError) {
      setSearch(null);
      setError(searchError instanceof Error ? searchError.message : "Não foi possível realizar a busca.");
    } finally {
      setLoading(false);
    }
  }

  function chooseTopic(nextTopic: Topic) {
    setTopic(nextTopic);
    setTab("analysis");
  }

  const requestedAt = search
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(search.requestedAt))
    : "";

  return <main>
    <div className="live-banner"><b>PUBMED AO VIVO</b><span>A busca consulta agora a base pública do PubMed. A leitura editorial demonstrativa permanece identificada abaixo.</span></div>
    <header><a href="#top" className="brand"><span>∆</span>Evidência em pauta</a><nav>Grupo 2 · Oficina Codesinfo</nav></header>

    <section className="hero" id="top">
      <div><p className="eyebrow">BUSCA CIENTÍFICA PARA JORNALISTAS</p><h1>Da pergunta à<br/><em>literatura científica.</em></h1><p>Pesquise um tema de saúde e consulte registros atuais do PubMed, com procedência e sem um veredito automático.</p></div>
      <form onSubmit={submit}>
        <label htmlFor="search">Pesquise um tema no PubMed</label>
        <div><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: câncer de mama" required minLength={3} maxLength={180}/><button disabled={loading}>{loading ? "Consultando o PubMed…" : "Buscar no PubMed →"}</button></div>
        <small>Você pode pesquisar em português ou inglês. O protótipo ainda não mantém um histórico pessoal de buscas.</small>
      </form>
    </section>

    <div className="search-feedback" aria-live="polite">
      {loading && <span>Buscando registros e resumos diretamente no PubMed…</span>}
      {error && <span className="error-message">{error}</span>}
    </div>

    {search && <section className="pubmed-results" id="resultados">
      <div className="results-heading">
        <div><p className="eyebrow">RESULTADOS REAIS · PUBMED</p><h2>Literatura para “{search.query}”</h2><p>Exibindo {search.articles.length} de {search.total.toLocaleString("pt-BR")} registros encontrados · consulta realizada em {requestedAt}.</p></div>
        <div className="source-note"><b>Como ler</b><span>A ordem de relevância vem do PubMed. Presença nesta lista não confirma nem refuta uma alegação.</span></div>
      </div>

      {search.articles.length === 0 ? <div className="empty-state"><h3>Nenhum registro encontrado</h3><p>Tente termos mais gerais, outra grafia ou a tradução do tema para o inglês.</p></div> : <div className="pubmed-list">
        {search.articles.map((article, index) => {
          const visibleAuthors = article.authors.slice(0, 6);
          const languages = article.languages.map((language) => languageNames[language] ?? language);
          return <article className="pubmed-card" key={article.pmid}>
            <span className="result-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="pubmed-card-content">
              <div className="result-tags">{(article.publicationTypes.length ? article.publicationTypes : ["Registro PubMed"]).slice(0, 3).map((publicationType) => <span key={publicationType}>{publicationType}</span>)}</div>
              <h3>{article.title}</h3>
              <p className="article-authors">{visibleAuthors.length ? visibleAuthors.join("; ") : "Autoria não informada"}{article.authorsTruncated ? "; et al." : ""}</p>
              <p className="article-meta">{article.journal} · {article.publishedAt}{languages.length ? ` · ${languages.join(", ")}` : ""}{article.doi ? ` · DOI ${article.doi}` : ""}</p>
              {article.abstract ? <details><summary>Ver resumo disponível no PubMed</summary><p>{article.abstract}</p></details> : <small>Este registro não oferece resumo no PubMed.</small>}
            </div>
            <a href={article.url} target="_blank" rel="noreferrer">Abrir registro ↗</a>
          </article>;
        })}
      </div>}
    </section>}

    <section className="demo-divider">
      <p className="eyebrow">DEMONSTRAÇÃO EDITORIAL · CONTEÚDO SIMULADO</p><h2>Como uma futura checagem pode organizar a leitura</h2><p>A busca acima é real. A análise abaixo continua sendo um exemplo separado, com duas alegações criadas apenas para demonstrar o fluxo.</p>
      <div className="case-selector" aria-label="Escolha uma alegação demonstrativa">{(Object.keys(cases) as Topic[]).map((caseTopic) => <button key={caseTopic} className={topic === caseTopic ? "active" : ""} onClick={() => chooseTopic(caseTopic)}>{cases[caseTopic].shortLabel}</button>)}</div>
    </section>

    <section className="case-head"><div><p className="eyebrow">ALEGAÇÃO DEMONSTRATIVA SELECIONADA</p><h2>{data.claim}</h2><p>{data.origin} · {data.date} · ausência de origem é dado ausente, não evidência negativa</p></div><span className="simulation-stamp">ALEGAÇÃO SIMULADA</span></section>
    <div className="tabs"><button className={tab === "analysis" ? "active" : ""} onClick={() => setTab("analysis")}>Leitura da alegação</button><button className={tab === "science" ? "active" : ""} onClick={() => setTab("science")}>Evidências selecionadas <i>{data.articles.length}</i></button><button className={tab === "sources" ? "active" : ""} onClick={() => setTab("sources")}>Fontes para a pauta <i>{data.researchers.length}</i></button></div>

    <section className="workspace">
      {tab === "analysis" && <><div className="verdict"><div className="status-icon">≈</div><div><p className="eyebrow">SINAL DA ANÁLISE DEMONSTRATIVA</p><h2>{data.assessment}</h2><p>{data.why}</p></div><div className="confidence"><small>Confiança</small><b>{data.confidence}</b><span>do cenário simulado</span></div></div><div className="analysis-grid"><article><span>01</span><h3>O que a alegação afirma</h3><blockquote>“{data.claim}”</blockquote><p>Formulação absoluta e causal, apresentada sem método ou grau de incerteza.</p></article><article><span>02</span><h3>O que procurar na evidência</h3><ul><li>Desenho e tamanho dos estudos</li><li>Diferença entre associação e causalidade</li><li>Consistência entre resultados</li><li>Limitações declaradas pelos autores</li></ul></article></div><div className="pitch"><p className="eyebrow">SUGESTÃO DE PAUTA</p><h2>{data.pitch}</h2><small>Gerada apenas a partir do conjunto demonstrativo exibido nesta página.</small></div></>}

      {tab === "science" && <div className="science"><div className="section-intro"><p className="eyebrow">PUBMED · AMOSTRA CURADA PARA A DEMONSTRAÇÃO</p><h2>Literatura relacionada</h2><p>Dois registros reais foram selecionados para testar o fluxo editorial. Esta amostra não é o resultado da busca realizada acima.</p></div>{data.articles.map((article, index) => <article key={article.title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{article.signal}</b><h3>{article.title}</h3><p>{article.authors} · {article.year}</p><small>{article.method}</small></div><a href={article.url} target="_blank" rel="noreferrer">Abrir no PubMed ↗</a></article>)}</div>}

      {tab === "sources" && <div className="sources"><div className="section-intro"><p className="eyebrow">AUTORES DOS REGISTROS SELECIONADOS</p><h2>Possíveis fontes</h2><p>Nomes e vínculos derivam do PubMed; identidade, vínculo atual e disponibilidade exigem confirmação editorial.</p></div>{data.researchers.map((researcher, index) => <article key={researcher.name}><div className="rank">{index + 1}</div><div><h3>{researcher.name}</h3><p>{researcher.area} · {researcher.inst}</p><small>{researcher.reason}</small></div><div className="score"><b>{researcher.score}</b><span>aderência demonstrativa</span></div></article>)}</div>}
    </section>

    <aside className="limits"><b>Limites desta versão</b><p>A nova busca recupera literatura real do PubMed, mas ainda não avalia automaticamente uma alegação, não revisa a literatura completa e não recomenda pesquisadores a partir dos resultados. A análise editorial abaixo permanece simulada. O protótipo não diagnostica nem aconselha tratamento.</p></aside>
    <footer><span>Evidência em pauta · busca PubMed ao vivo</span><span>Conclusão editorial sempre humana</span></footer>
  </main>;
}
