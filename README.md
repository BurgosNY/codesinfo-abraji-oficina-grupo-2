# Evidência em pauta

Protótipo do Grupo 2 da Oficina Codesinfo/Abraji para apoiar jornalistas na pesquisa de evidências científicas sobre saúde.

A versão atual permite pesquisar um tema na base pública do PubMed e consultar registros reais com título, autoria, periódico, data, tipo de publicação, idioma, DOI, resumo e link para a fonte original. A aplicação também mantém uma demonstração editorial separada para mostrar como uma futura checagem poderia organizar alegação, evidências, incertezas, fontes e sugestão de pauta.

O projeto não determina automaticamente se uma alegação é verdadeira ou falsa, não substitui uma revisão da literatura e não oferece orientação médica.

## O que já funciona

- Busca ao vivo no PubMed por palavra-chave ou expressão de pesquisa.
- Até 8 resultados ordenados pela relevância calculada pelo próprio PubMed.
- Recuperação de metadados e resumos por meio das APIs públicas ESearch e EFetch do NCBI.
- Exibição de autoria, periódico, data, idioma, tipo de publicação, PMID, DOI e link original.
- Mensagens para busca vazia, termos inválidos, ausência de resultados, indisponibilidade e timeout do PubMed.
- Cache HTTP curto para reduzir chamadas repetidas à API pública.
- Dois cenários editoriais simulados, claramente identificados como demonstração.
- Interface responsiva para computador e celular.
- Testes da página, da validação da busca e da normalização das respostas do PubMed.

## Como a busca funciona

1. A pessoa digita um tema com 3 a 180 caracteres.
2. O frontend chama `GET /api/pubmed?q=<consulta>`.
3. O servidor envia a expressão ao `ESearch`, com `sort=relevance`.
4. O PubMed aplica suas próprias regras de busca, incluindo Automatic Term Mapping e Best Match.
5. Os identificadores dos 8 primeiros resultados são enviados ao `EFetch`.
6. A aplicação normaliza o XML e devolve os registros para a interface.

A aplicação preserva a ordem entregue pelo PubMed. Ela ainda não traduz automaticamente consultas em português, não calcula um ranking científico próprio e não faz busca fuzzy geral. Consultas em inglês normalmente oferecem uma cobertura mais ampla.

Também é possível usar expressões aceitas pelo PubMed, por exemplo:

```text
breast cancer screening
"breast cancer"
breast cancer AND mammography
breast cancer[Title]
2024:2026[Publication Date]
```

## Como rodar localmente

### Requisitos

- Node.js `>=22.13.0`
- npm

Não é necessário configurar uma chave para a primeira versão da integração com o PubMed.

### Instalação e execução

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Validação

```bash
npm test
npm run lint
npm run build
```

- `npm test`: gera o build e executa os testes automatizados.
- `npm run lint`: verifica o código com ESLint.
- `npm run build`: gera o bundle vinext usado pelo ambiente de publicação.

## Estrutura principal

```text
app/
├── api/pubmed/route.ts    # Integração ESearch/EFetch e normalização dos registros
├── globals.css            # Estilos e responsividade
├── layout.tsx             # Metadados e layout raiz
└── page.tsx               # Busca, resultados e demonstração editorial

tests/
└── rendered-html.test.mjs # Testes da página e da API
```

## Limites da versão atual

- Recupera literatura científica, mas não avalia automaticamente uma alegação.
- Mostra apenas os 8 primeiros resultados do Best Match do PubMed.
- Não traduz consultas nem exibe como o PubMed interpretou cada termo.
- Não pesquisa a SciELO ou outras bases científicas.
- Não identifica alegações ou conteúdos publicados na internet.
- Não cria um ranking próprio de qualidade metodológica ou força da evidência.
- Não recomenda pesquisadores com base nos resultados recuperados.
- Não mantém contas, buscas salvas, monitoramento ou alertas.
- Os dois casos de checagem apresentados abaixo da busca são demonstrações estáticas.

## Roadmap possível

O roadmap está ordenado aproximadamente da menor para a maior complexidade e deve ser validado feature a feature.

### Próximos incrementos

1. **Transparência da consulta:** mostrar como o PubMed traduziu os termos e sugerir uma consulta equivalente em inglês ou MeSH sem substituir silenciosamente o texto original.
2. **Controles de busca:** filtros por data, idioma, tipo de estudo, campo e quantidade de resultados.
3. **Leitura dos resultados:** destacar por que cada registro apareceu e diferenciar revisão, ensaio clínico, estudo observacional, editorial e outros desenhos.
4. **Recomendação de pesquisadores:** agrupar autores recorrentes e explicar a recomendação por aderência, produção, atualidade, autoria e vínculo informado na publicação.
5. **Integração com SciELO:** normalizar resultados da SciELO no mesmo modelo usado para os registros do PubMed.

### Evolução editorial

6. **Alegação com procedência:** aceitar texto, URL, veículo, data e localização, mantendo a origem rastreável.
7. **Comparação alegação–evidência:** organizar sinais de apoio, contradição, incerteza ou ausência de evidência, sempre com justificativa e limitações.
8. **Sugestão de pauta dinâmica:** produzir perguntas jornalísticas a partir do conjunto de evidências realmente recuperado.
9. **Revisão humana:** permitir que jornalistas selecionem estudos, acrescentem notas e registrem uma conclusão editorial.

### Monitoramento e alertas

10. **Listas de acompanhamento:** salvar temas, domínios e consultas para execução periódica.
11. **Histórico temporal:** registrar novos conteúdos, frequência e mudanças de posição ao longo do tempo.
12. **Alertas explicáveis:** sinalizar crescimento de uma narrativa, repetição entre sites, divergência científica, alta exposição ou venda de produto relacionado.
13. **Filtros geográficos:** país, estado, cidade, idioma, origem do veículo, região de repercussão e localização declarada de especialistas.
14. **Avaliação por conteúdo:** apresentar domínio, URL, data, alcance estimado, risco, tendência e justificativa sem generalizar uma publicação para todo o veículo.
15. **Ranking transparente de sites e narrativas:** separar reputação geral, avaliação do conteúdo e sinais de disseminação, mostrando os fatores que alteraram cada posição.
16. **Descoberta ampla na web:** incorporar fontes públicas previamente definidas e dados de busca para identificar novas alegações e acompanhar sua circulação.

## Princípios do projeto

- Todo conteúdo simulado deve ser identificado como demonstração.
- A ausência de evidência não deve ser apresentada como evidência de ausência.
- O sistema deve mostrar procedência, critérios, limitações e incerteza.
- A avaliação de uma publicação não deve classificar automaticamente todo o veículo.
- Sexo, gênero e outros atributos sensíveis não devem ser inferidos por nome ou fotografia.
- A conclusão editorial e a decisão de publicação permanecem humanas.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- vinext
- Cloudflare Workers / Sites
- NCBI E-utilities — PubMed ESearch e EFetch
- fast-xml-parser
