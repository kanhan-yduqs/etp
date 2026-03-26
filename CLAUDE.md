# Observatório Nacional ETP

Plataforma web de referência sobre ensino técnico médio profissionalizante no Brasil. Projeto de Marcelo Kanhan (comunicação, computational social science) com apoio institucional da Estácio. Branding: **Observatório Nacional ETP**.

## Visão

Ser para a educação profissional brasileira o que o Our World in Data é para dados globais: fonte confiável, acessível e visualmente rica que traduz dados complexos em conhecimento acionável. Resolve a fragmentação de dados entre INEP, Nilo Peçanha, IBGE, MTE e organismos internacionais.

## Público-alvo

Formuladores de políticas, gestores educacionais, pesquisadores, jornalistas, professores, estudantes e famílias.

## Arquitetura de conteúdo

Quatro camadas: **Dados** (indicadores + visualizações interativas) | **Análises** (white papers, AI-assisted com revisão humana) | **Políticas** (monitor de programas e metas PNE) | **Recursos** (imprensa, glossário, metodologia).

### Mapa do site

```
/                         Home (destaques, números-chave)
/painel/                  Dashboard: matrículas, cursos, docentes, infraestrutura, resultados, empregabilidade, financiamento
/comparacoes/             Comparações internacionais (OCDE, UNESCO)
/politicas/               Monitor: Pé-de-Meia, Novo EM, Ensino Integral, PROPAG, PRONATEC, PNE (metas 10 e 11)
/analises/                White papers e artigos de profundidade
/perfis/                  Perfis estaduais (27 UFs)
/glossario/               Termos e definições
/metodologia/             Fontes e tratamento de dados
/imprensa/                Sala de imprensa
/sobre/                   Institucional
```

### Componentes de dados

Cada página de indicadores: big number com tendência, gráfico interativo (linha/barras/mapa), filtros (UF, rede, modalidade, eixo, período), download (CSV/PNG/SVG), embed (iframe), nota metodológica colapsável, "Leia também".

## Fontes de dados prioritárias

**Nacionais:** Censo Escolar/INEP (microdados, anual), Sinopses Estatísticas/INEP, Plataforma Nilo Peçanha/SETEC, PNAD Contínua/IBGE, Censo 2022/IBGE, RAIS e CAGED/MTE, SISTEC, CNCT 4a ed., SAEB/ENEM, IDEB, SIAFI/SIOP.

**Internacionais:** UIS/UNESCO, Education at a Glance/OCDE, PIAAC/OCDE, EdStats/Banco Mundial, ILOSTAT/OIT, CIMA/BID.

**Sistema S:** SENAI, SENAC, SENAR, SENAT (relatórios anuais). Conif. WorldSkills.

## Políticas públicas monitoradas

Novo Ensino Médio (Lei 14.945/2024, tensão FGB 2400h vs FTP 600h), Pé-de-Meia/Pé-de-Meia Técnico, PROPAG (expansão Rede Federal/Novo PAC), Ensino Integral, Metas PNE 10 e 11, legado PRONATEC.

**O que monitorar:** evolução matrículas por modalidade, metas PNE, impacto Pé-de-Meia, impacto PROPAG na expansão e projeções de atingimento das metas por estado, cobertura geográfica, alinhamento oferta x mercado, comparação internacional (% jovens em VET).

## Comparações internacionais

Alemanha (dual), Suíça (permeabilidade), Austrália (NCVER), Coreia do Sul (Meister/KRIVET), Finlândia (equidade), Chile/Colômbia (pares regionais), Singapura (ITE).

## IA e conteúdo

Conteúdo **essencialmente AI-based** (Claude Opus 4.6) com revisão humana. Aplicações: redação de análises e white papers, sumarização de relatórios, tradução PT-EN-ES, detecção de tendências/anomalias, clustering regional, projeções, NLP em legislação, busca semântica.

**Conteúdo inicial de lançamento:** textos institucionais, panorama nacional, análise por região (5 white papers regionais), comparativo internacional, monitor de cada política pública ativa. Escopo generoso para lançamento com substância.

## Design e interface

Dados como protagonista, progressive disclosure, mobile-first, paleta colorblind-safe (WCAG 2.1 AA). Identidade visual a ser criada (ferramentas externas como Stitch/Google, templates prontos, ou do zero com referências).

Componentes: big numbers + sparklines, mapas coropléticos (Leaflet/MapLibre), gráficos de linha/barras, small multiples, waffle charts, tabelas ordenáveis. Acessibilidade: keyboard nav, alt text, data tables, ARIA, prefers-reduced-motion.

Referência de site "featured": https://www.anthropic.com/features/81k-interviews

## Stack técnica

| Camada | Tecnologia |
|---|---|
| SSG | Astro ou Eleventy (decidir após primeiro lote de dados) |
| Estilização | TailwindCSS |
| Visualização | Chart.js + Leaflet/MapLibre (D3 se necessário) |
| Dados | JSON/CSV estáticos gerados por pipeline ETL |
| ETL | Python (pandas) |
| Deploy | GitHub Pages ou Cloudflare Pages + GitHub Actions |
| Busca | Pagefind (client-side, sem servidor) |
| CMS | Markdown + frontmatter no repositório |

**Princípios:** manutenção zero ou mínima, sem banco de dados em produção, sem complexidade desnecessária, open source, desenvolvimento local (localhost), deploy automático.

### Pipeline

```
Fontes oficiais → download manual (dados anuais/estáveis)
  → Scripts Python ETL (limpeza, transformação)
  → JSON/CSV em /data/processed/
  → Build (Astro/Eleventy)
  → Deploy CDN (GitHub Actions)
```

### Estrutura do repositório

```
observatorio_etp/
├── data/
│   ├── raw/                 # Microdados originais (.gitignore se pesados)
│   ├── processed/           # JSONs/CSVs tratados
│   └── scripts/             # Scripts Python de ETL
├── src/
│   ├── pages/
│   ├── components/          # Gráficos, filtros, mapas
│   ├── layouts/
│   ├── styles/
│   └── content/             # Análises e white papers (Markdown)
├── public/                  # Assets estáticos
├── .github/workflows/       # CI/CD
├── CLAUDE.md                # Este arquivo
└── package.json
```

## SEO e distribuição

Schema.org Dataset markup, OG/Twitter Cards com imagens dinâmicas, URLs semânticas e perenes, sitemap XML, títulos orientados a perguntas. Gráficos embeddáveis, newsletter, cards para redes sociais, citabilidade acadêmica. Multilíngue em fase futura (URLs preparadas com /en/, /es/).

## Roadmap

### Fase 0 - Fundação (COMPLETA)
- [x] Briefing e planejamento
- [x] Pesquisa extensiva e seleção de dados prioritários
- [x] Download e processamento do primeiro lote de dados (Sinopses INEP 2019-2024)
- [x] Framework: Astro escolhido (islands architecture)
- [x] Setup: Astro + TailwindCSS + Chart.js
- [x] Design system: tokens do Stitch/Google, 7 componentes, templates light+dark em design/reference/
- [x] Pipeline ETL Python: 5 JSONs gerados (série temporal, UF, região, modalidade, metadata)
- [x] Home com big numbers + 2 gráficos interativos (Chart.js)
- [x] Painel com 3 gráficos (modalidades, top UFs, distribuição por rede)
- [x] Metodologia com conteúdo real (fontes, ETL, dicionário de dados)
- [x] CI: GitHub Actions (build check)
- [x] README

### Fase 1 - MVP (COMPLETA)
- [x] Content Collections (Astro) para análises e políticas
- [x] EditorialLayout para páginas Markdown
- [x] Dark mode toggle (localStorage, sem flash)
- [x] Mapa coroplético do Brasil (Leaflet + GeoJSON IBGE, clique → perfil UF)
- [x] Filtros interativos no Painel (Ano, UF, Rede — gráficos respondem)
- [x] 27 perfis estaduais gerados dinamicamente + listagem por região
- [x] 5 páginas de políticas (Pé-de-Meia, Novo EM, PROPAG, PRONATEC, PNE)
- [x] 7 white papers (panorama nacional, 5 regionais, comparativo internacional)
- [x] Comparações internacionais (10 países, tabela ranking, gráfico, modelos)
- [x] Pagefind: busca client-side indexando 47 páginas
- [x] SEO: sitemap, robots.txt, OG tags, canonical URLs
- [x] Home atualizada com links para políticas, comparações e análises reais

### Fase 2 - Expansão
- [ ] Dados de empregabilidade (RAIS/CAGED)
- [ ] Perfis estaduais (27 UFs)
- [ ] Comparações internacionais expandidas
- [ ] Sala de imprensa
- [ ] Busca (Pagefind), embeds, downloads

### Fase 3 - Escala
- [ ] Newsletter, SEO avançado, OG images dinâmicas
- [ ] Multilíngue (EN/ES)
- [ ] API de dados
- [ ] Parcerias institucionais
- [ ] Guia de cursos para estudantes

## Benchmarks

**UX:** Our World in Data, Observatório do PNE, QEdu.
**VET internacional:** BIBB (Alemanha), NCVER (Austrália), Cedefop (Europa).
**Dados BR:** Plataforma Nilo Peçanha, Lab Dados Educacionais UFPR, SENAI Observatório da Indústria.

---

## Como rodar

```bash
# Dev server
npm install
npm run dev          # http://localhost:4321

# Build estático
npm run build        # gera dist/
npm run preview      # serve o build

# Pipeline de dados (quando INEP publicar novos dados)
cd data
source .venv/bin/activate
python scripts/00_download_sinopses.py --anos 2025
python scripts/01_process_sinopses.py
# Depois: npm run build para regenerar o site com dados novos
```

---

## Handoff - Estado atual e próximas etapas

**Estágio:** Fase 2 em andamento. Sprints 1-2 completos, 3-6 pendentes.

**O que está funcional:**
- 49 páginas estáticas (Home, Painel com filtros, 27 perfis UF, 5 políticas, 7 análises, comparações, glossário, imprensa, sobre, metodologia)
- 8+ gráficos Chart.js interativos + mapa coroplético Leaflet
- Filtros interativos no Painel (Ano, UF, Rede)
- Busca client-side (Pagefind, 49 páginas, 2165 palavras indexadas)
- Dark mode auditado (charts com CSS custom properties, prose com dark overrides)
- Conteúdo editorial expandido: 12 artigos substantivos com dados reais
- Glossário com 45+ termos EPT, sala de imprensa com fact sheet
- SEO: sitemap, robots.txt, OG/Twitter meta tags, canonical URLs
- Pipeline ETL Python (6 anos INEP 2019-2024)
- CI via GitHub Actions
- Build em ~4.5s

**Fase 2 Sprints completados:**
- [x] Sprint 1: Glossário + Imprensa + Dark Mode Audit
- [x] Sprint 2: Conteúdo expandido (12 artigos com dados reais)

**Próximos sprints (ver plano em .claude/plans/):**
3. **Dados de empregabilidade** — RAIS/CAGED (dados curados + ETL + dashboard)
4. **Gráficos embeddáveis** — EmbedLayout + 6 páginas /embed/ + EmbedModal
5. **Downloads CSV/PNG** — ChartActions em todos os gráficos
6. **Deploy + polish** — GitHub Pages, sitemap filter, CLAUDE.md final
