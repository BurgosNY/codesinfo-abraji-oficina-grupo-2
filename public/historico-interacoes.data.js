window.HISTORY = {
  group: 2,
  dateLabel: "31 de julho de 2026",
  collectedLabel: "17 de agosto de 2026",
  phases: {
    abertura: "Conversas iniciais",
    brief: "Definição do produto",
    revisao: "Revisão do escopo",
    entrega: "Construção e publicação",
  },
  decisions: [
    "Público principal: jornalistas que investigam alegações de saúde e câncer.",
    "Busca iniciada por palavra-chave, com confronto entre alegações públicas e evidências do PubMed e SciELO.",
    "Recomendação de pesquisadores baseada em aderência ao tema, produção, métodos, atualidade e vínculo institucional.",
    "Monitoramento de sites, crescimento de narrativas e alertas para conteúdos de maior risco ou alcance.",
    "Filtros geográficos e ranking explicável, separando a avaliação de um conteúdo da reputação geral do site.",
    "Sem inferir sexo por nome ou fotografia e sem vereditos automáticos de verdadeiro ou falso.",
    "Primeira versão pública apresentada como demonstração com conteúdo simulado.",
  ],
  status: {
    title: "SITE PUBLICADO",
    text: "A versão 0d61fde6 foi publicada como protótipo de apoio à checagem de alegações sobre câncer, após uma revisão que ampliou monitoramento, alertas e filtros geográficos.",
  },
  messages: [
    {
      phase: "abertura", kind: "conversa", role: "pessoa", author: "Pedro Burgos", time: "07:01:16", datetime: "2026-07-31T07:01:16-03:00",
      body: "@Oficina Codex teste de roteamento. Responda somente: grupo-2 pronto.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785492076573739",
    },
    {
      phase: "abertura", kind: "conversa", role: "app", author: "Oficina Codex", time: "07:01:25", datetime: "2026-07-31T07:01:25-03:00", edited: true,
      body: "grupo-2 pronto.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785492085711439",
    },
    {
      phase: "abertura", kind: "status", role: "sistema", author: "Sistema da oficina", time: "11:24:37", datetime: "2026-07-31T11:24:37-03:00",
      body: "Pedro Burgos tornou o canal público. Qualquer membro do workspace pode vê-lo e entrar nele.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785507877350899",
    },
    {
      phase: "abertura", kind: "conversa", role: "pessoa", author: "Daniel Dieb", time: "11:31:54", datetime: "2026-07-31T11:31:54-03:00",
      body: "Olá, equipe!",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785508314948579",
    },
    {
      phase: "brief", kind: "projeto", role: "pessoa", author: "Pedro Burgos", time: "11:33:26", datetime: "2026-07-31T11:33:26-03:00",
      body: "@Oficina Codex Quero criar um app",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785508406511139",
    },
    {
      phase: "brief", kind: "projeto", role: "app", author: "Oficina Codex", time: "11:33:35", datetime: "2026-07-31T11:33:35-03:00", edited: true,
      body: "Vamos transformar isso num MVP pequeno e testável. Qual problema o app deve resolver, para quem, e qual é a ação principal que a pessoa precisa conseguir realizar?",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785508415267079",
    },
    {
      phase: "brief", kind: "projeto", role: "pessoa", author: "Graciele Oliveira", time: "11:37:49", datetime: "2026-07-31T11:37:49-03:00",
      body: "@Oficina Codex queremos criar um app que 1 identifique as principais informações sobre o câncer na internet; 2 correlacionar esses dados com as publicações científicas em bases de dados com o Scielo e Pubmed.com; 3 encontrar os autores que mais publicam sobre temas relacionados com as publicações encontradas na internet; 4 recomende um pesquisador para fonte em pautas sobre o tema",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785508669566529",
    },
    {
      phase: "brief", kind: "projeto", role: "app", author: "Oficina Codex", time: "11:37:57", datetime: "2026-07-31T11:37:57-03:00", edited: true,
      body: `Entendi: um app para apoiar jornalistas na busca de fontes científicas sobre câncer. O fluxo seria: inserir um tema → localizar conteúdos relevantes na internet → cruzar termos com SciELO e PubMed → identificar autores recorrentes → recomendar pesquisadores, mostrando as evidências da escolha.

Para fechar o MVP, precisamos definir:
• O usuário principal é jornalista?
• A busca começa por uma palavra-chave (ex.: “câncer de mama”) ou por uma URL de matéria?
• A recomendação deve considerar quais critérios: volume de publicações, aderência ao tema, produção recente e vínculo institucional?
• No primeiro protótipo, podemos limitar a análise a resultados públicos de PubMed e SciELO, sem varrer toda a internet?`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785508677494009",
    },
    {
      phase: "brief", kind: "projeto", role: "pessoa", author: "Graciele Oliveira", time: "11:43:24", datetime: "2026-07-31T11:43:24-03:00",
      body: "@Oficina Codex queremos filtrar as informações para identificar as desinformações. O principal usuário é o jornalista; a busca começa com uma palavra-chave, mas, ao mesmo tempo, identifica as principais desinformações sobre o assunto na internet e sugere a pauta ao jornalista. Sim, a recomendação deve se basear em volume de publicações, aderência ao tema, título do artigo, resumo, métodos utilizados, produção recente, vínculo à universidades, assim como o sexo, de acordo com o IBGE. O resultado ao jornalista deve se basear em base de dados de ciência, como o Pubmed.com",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785509004041299",
    },
    {
      phase: "brief", kind: "status", role: "app", author: "Oficina Codex", time: "11:44:38", datetime: "2026-07-31T11:44:38-03:00", edited: true,
      body: `Brief do MVP consolidado e marcado como BRIEF_READY. O app apoiará jornalistas na identificação de alegações potencialmente enganosas, no confronto com evidências do PubMed, na sugestão de pautas e na recomendação transparente de pesquisadores.

O MVP não inferirá sexo pelo nome ou fotografia e não dará vereditos automáticos de “verdadeiro” ou “falso”. Aguardamos a aprovação do coordenador antes de construir.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785509078421139",
    },
    {
      phase: "brief", kind: "conversa", role: "pessoa", author: "Graciele Oliveira", time: "11:48:22", datetime: "2026-07-31T11:48:22-03:00",
      body: "@Oficina Codex ok",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785509302021129",
    },
    {
      phase: "brief", kind: "status", role: "app", author: "Oficina Codex", time: "11:48:28", datetime: "2026-07-31T11:48:28-03:00", edited: true,
      body: "Perfeito. O brief está pronto e aguardando aprovação do coordenador para iniciar a construção.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785509308565059",
    },
    {
      phase: "brief", kind: "conversa", role: "pessoa", author: "leticiamaia3011", time: "11:52:41", datetime: "2026-07-31T11:52:41-03:00",
      body: "@Pedro Burgos",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785509561296089",
    },
    {
      phase: "revisao", kind: "conversa", role: "pessoa", author: "Graciele Oliveira", time: "12:13:36", datetime: "2026-07-31T12:13:36-03:00",
      body: "@Pedro Burgos podemos refinar ou esperamos o resultado primeiro?",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785510816016389",
    },
    {
      phase: "revisao", kind: "conversa", role: "pessoa", author: "leticiamaia3011", time: "12:14:56", datetime: "2026-07-31T12:14:56-03:00",
      body: "a gente queria mandar mais uma coisinha pro prompt",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785510896283669",
    },
    {
      phase: "revisao", kind: "conversa", role: "pessoa", author: "Pedro Burgos", time: "12:19:21", datetime: "2026-07-31T12:19:21-03:00",
      body: "Pode mandar mais, mas isso vai ser incorporado à segunda versão",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511161234449",
    },
    {
      phase: "revisao", kind: "status", role: "app", author: "Oficina Codex", time: "12:20:18", datetime: "2026-07-31T12:20:18-03:00",
      body: `REVISÃO NECESSÁRIA — versão 0d61fde6

O brief não define o conjunto público de fontes usado para localizar alegações potencialmente enganosas. O PubMed pode fornecer artigos reais, mas sem fontes de alegações aprovadas não é possível cumprir o fluxo de comparação com origem rastreável. Nenhum site foi publicado para evitar alegações, URLs ou conclusões inventadas.

Consolidem no canal as definições que faltam; o agente atualizará o brief para uma nova aprovação.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511218994929",
    },
    {
      phase: "revisao", kind: "projeto", role: "pessoa", author: "leticiamaia3011", time: "12:22:43", datetime: "2026-07-31T12:22:43-03:00",
      body: `Queremos incorporar uma nova funcionalidade de monitoramento e alerta que analise o posicionamento de sites e conteúdos sobre determinado tema de saúde.

A ferramenta deve identificar, comparar e ranquear os sites de acordo com critérios como:
• relevância e alcance do conteúdo;
• frequência de publicação sobre o tema;
• crescimento recente de menções;
• presença nos primeiros resultados de busca;
• potencial de disseminação da informação;
• nível de confiabilidade da fonte;
• recorrência de conteúdos enganosos ou sem respaldo científico;
• posicionamento em relação às evidências encontradas em bases como PubMed e SciELO.

Também queremos um sistema de alertas que sinalize quando:
• um site ganhar destaque rapidamente nas buscas;
• uma alegação potencialmente falsa começar a crescer;
• diferentes sites repetirem a mesma narrativa;
• um conteúdo de alto risco alcançar grande visibilidade;
• surgir uma divergência relevante entre o conteúdo publicado e as evidências científicas;
• uma narrativa começar a circular em uma nova região;
• venda de produto relacionado.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511363306119",
    },
    {
      phase: "revisao", kind: "projeto", role: "pessoa", author: "leticiamaia3011", time: "12:23:23", datetime: "2026-07-31T12:23:23-03:00",
      body: `A plataforma também deve oferecer um filtro geográfico, permitindo que o usuário visualize os resultados por:
• país;
• estado;
• cidade ou região;
• idioma;
• localização do veículo ou site;
• região em que o conteúdo está ganhando repercussão;
• localização dos especialistas indicados como fontes.

O filtro geográfico deve ajudar jornalistas a identificar narrativas locais, comparar diferenças regionais e encontrar especialistas próximos ou com experiência na população afetada.

Cada resultado deve apresentar:
• nome e domínio do site;
• título e link do conteúdo;
• data de publicação;
• tema e alegação principal;
• localização associada;
• alcance ou relevância estimada;
• classificação de confiabilidade;
• evidências científicas relacionadas;
• justificativa da classificação;
• nível de risco;
• tendência de crescimento;
• especialistas recomendados para explicar ou contestar a alegação.

O ranking deve ser transparente. O usuário precisa conseguir entender quais critérios fizeram um site subir ou cair de posição. A ferramenta não deve classificar automaticamente um veículo inteiro como desinformativo com base em apenas uma publicação. A análise deve diferenciar a reputação geral do site da avaliação específica de cada conteúdo.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511403689789",
    },
    {
      phase: "revisao", kind: "projeto", role: "pessoa", author: "leticiamaia3011", time: "12:23:52", datetime: "2026-07-31T12:23:52-03:00",
      body: `A plataforma também deve oferecer um filtro geográfico, permitindo que o usuário visualize os resultados por país, estado, cidade ou região, idioma, localização do veículo ou site, região em que o conteúdo está ganhando repercussão e localização dos especialistas indicados como fontes.

Cada resultado deve apresentar nome e domínio do site, título e link do conteúdo, data, tema e alegação principal, localização, alcance, classificação de confiabilidade, evidências, justificativa, nível de risco, tendência e especialistas recomendados. O ranking deve ser transparente e diferenciar a reputação geral do site da avaliação específica de cada conteúdo.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511432564759",
    },
    {
      phase: "revisao", kind: "projeto", role: "pessoa", author: "leticiamaia3011", time: "12:25:13", datetime: "2026-07-31T12:25:13-03:00",
      body: `@Oficina Codex

Queremos incorporar uma nova funcionalidade de monitoramento e alerta que analise o posicionamento de sites e conteúdos sobre determinado tema de saúde. A ferramenta deve identificar, comparar e ranquear os sites por relevância, alcance, frequência, crescimento de menções, presença em buscas, disseminação, confiabilidade, recorrência de conteúdo enganoso e relação com evidências do PubMed e SciELO.

Também queremos alertas para crescimento rápido, alegações potencialmente falsas, narrativas repetidas, conteúdos de alto risco, divergências em relação às evidências, circulação em novas regiões e venda de produtos relacionados.

A plataforma deve oferecer filtros geográficos e apresentar nome e domínio, título e link, data, alegação, localização, alcance, confiabilidade, evidências, justificativa, risco, tendência e especialistas. O ranking deve ser transparente e separar a avaliação do conteúdo da reputação geral do site.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511513474419",
    },
    {
      phase: "revisao", kind: "status", role: "app", author: "Oficina Codex", time: "12:26:27", datetime: "2026-07-31T12:26:27-03:00", edited: true,
      body: `Revisão consolidada e registrada para a versão 2, com estado REVISION_QUEUED.

Ela inclui monitoramento, alertas, filtros geográficos, SciELO, detecção de venda de produtos e ranking explicável. Mantivemos a separação entre avaliação de um conteúdo e reputação geral do site. A construção não foi iniciada.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785511587410029",
    },
    {
      phase: "entrega", kind: "status", role: "app", author: "Oficina Codex", time: "12:33:26", datetime: "2026-07-31T12:33:26-03:00",
      body: `VAMOS CONSTRUIR UMA PRIMEIRA VERSÃO — Criar uma demonstração interativa da checagem: a pessoa escolhe ou cola uma alegação de exemplo e vê como evidências, fontes, incertezas e conclusão seriam organizadas. Todo conteúdo simulado deve ser identificado como demonstração.

Vocês não precisam redefinir o projeto agora. O trabalho voltou para a fila e avisarei neste canal quando o link estiver pronto. Enquanto isso, enviarei atualizações de andamento aqui.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785512006303619",
    },
    {
      phase: "entrega", kind: "status", role: "sistema", author: "Sistema da oficina", time: "12:33:37", datetime: "2026-07-31T12:33:37-03:00",
      body: "ATUALIZAÇÃO — o MVP continua na fila de construção e publicação. Não é necessário reenviar o brief. Avisarei aqui assim que houver uma versão pública ou se alguma decisão do grupo for necessária.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785512017529249",
    },
    {
      phase: "entrega", kind: "status", role: "app", author: "Oficina Codex", time: "12:38:47", datetime: "2026-07-31T12:38:47-03:00",
      body: "ATUALIZAÇÃO — o MVP continua na fila de construção e publicação. Não é necessário reenviar o brief. Avisarei aqui assim que houver uma versão pública ou se alguma decisão do grupo for necessária.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785512327105369",
    },
    {
      phase: "entrega", kind: "status", role: "app", author: "Oficina Codex", time: "12:43:56", datetime: "2026-07-31T12:43:56-03:00",
      body: "ATUALIZAÇÃO — o MVP continua na fila de construção e publicação. Não é necessário reenviar o brief. Avisarei aqui assim que houver uma versão pública ou se alguma decisão do grupo for necessária.",
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785512636620749",
    },
    {
      phase: "entrega", kind: "status", role: "sistema", author: "Sistema da oficina", time: "12:46:43", datetime: "2026-07-31T12:46:43-03:00",
      body: `SITE PUBLICADO — https://codesinfo-abraji-oficina-grupo-2.burgos.chatgpt.site

Esta é a versão 0d61fde6. Enviem as revisões neste canal.

Evidência em pauta — protótipo
Demonstração de apoio à checagem de alegações sobre câncer.`,
      url: "https://codesinfo-abraji.slack.com/archives/C0BLM6VQJMD/p1785512803232259",
    },
  ],
};
