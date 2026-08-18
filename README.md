# Evidência em pauta

Protótipo do Grupo 2 da oficina de construção com IA do Hackaton Codesinfo, realizado no 21º Congresso da Abraji.

A ferramenta demonstra um fluxo de apoio a jornalistas que investigam alegações sobre câncer e saúde. Ela organiza uma alegação, uma amostra de literatura científica verificável, possíveis fontes acadêmicas e uma sugestão de pauta sem produzir um veredito editorial automático.

## O que o protótipo faz

- recebe um tema ou uma alegação em texto livre;
- aproxima a consulta de um dos cenários demonstrativos disponíveis;
- separa leitura da alegação, evidências científicas e fontes para a pauta;
- aponta método, autores, ano e link de registros reais do PubMed;
- explica por que cada pesquisador aparece como possível fonte;
- explicita incertezas, limitações da amostra e a necessidade de confirmação editorial;
- não infere atributos sensíveis nem oferece diagnóstico ou recomendação de tratamento.

## Estado atual

As alegações são simuladas e não têm origem real. Os artigos e links exibidos são verificáveis no PubMed, mas foram selecionados previamente: a versão publicada ainda não faz busca aberta na internet, não consulta o PubMed em tempo real e não equivale a uma revisão sistemática.

- [Abrir a demonstração](https://codesinfo-abraji-oficina-grupo-2.burgos.chatgpt.site)
- [Ler o registro das interações no Slack](public/historico-interacoes.html)

## Como rodar localmente

### Pré-requisitos

- Node.js 22.13 ou mais recente;
- npm.

### Instalação e desenvolvimento

```bash
npm ci
npm run dev
```

Abra no navegador o endereço informado pelo terminal.

### Validação e execução de produção

```bash
npm test
npm run build
npm run start
```

A interface está em `app/page.tsx`; os estilos ficam em `app/globals.css`.

## Roadmap possível

- [ ] Integrar consultas reais e rastreáveis ao PubMed e à SciELO.
- [ ] Definir e manter uma lista pública de fontes usadas para localizar alegações.
- [ ] Registrar URL, data, captura e contexto de circulação de cada alegação monitorada.
- [ ] Criar monitoramento de narrativas, crescimento de menções e alertas editoriais.
- [ ] Adicionar filtros por país, estado, idioma, período e repercussão regional.
- [ ] Tornar o ranking explicável, separando a análise do conteúdo da reputação geral do veículo.
- [ ] Verificar vínculo atual, identidade e contato profissional de possíveis fontes.
- [ ] Permitir salvar casos, comparar evidências e exportar um dossiê de apuração.
- [ ] Implantar revisão humana, trilha de auditoria e mecanismos de correção.

## Princípios editoriais

- A ferramenta não determina automaticamente se uma alegação é verdadeira ou falsa.
- Uma amostra de artigos não substitui revisão sistemática nem avaliação especializada.
- Toda conclusão deve preservar fonte, método, atualidade e grau de incerteza.
- A decisão de pauta e a conclusão editorial continuam humanas.
