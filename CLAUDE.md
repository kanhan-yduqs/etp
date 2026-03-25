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

### Fase 0 - Fundação (ATUAL)
- [x] Briefing e planejamento
- [ ] Pesquisa extensiva e seleção de dados prioritários
- [ ] Download e processamento do primeiro lote de dados (Censo Escolar)
- [ ] Escolha final do framework (Astro vs Eleventy, baseada nos dados)
- [ ] Setup do projeto (framework, TailwindCSS, build pipeline)
- [ ] Identidade visual e design system básico

### Fase 1 - MVP
- [ ] Pipeline ETL Censo Escolar (matrículas por modalidade, UF, rede)
- [ ] Home com números-chave
- [ ] 5-7 páginas de indicadores com gráficos e filtros
- [ ] Mapa coroplético do Brasil
- [ ] Conteúdo inicial: textos institucionais, panorama nacional
- [ ] 5 white papers regionais (um por região do Brasil)
- [ ] Páginas de políticas públicas
- [ ] Comparativo internacional básico
- [ ] Páginas Sobre e Metodologia
- [ ] Deploy funcional

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

## Handoff - Estado atual e próximas etapas

**Estágio:** Fase 0 - Fundação. Briefing completo e aprovado. Nenhum código escrito ainda.

**O que foi feito:**
- Briefing inicial elaborado e refinado com pesquisa extensiva de fontes, benchmarks e decisões de arquitetura
- Mapeamento completo de fontes de dados nacionais e internacionais
- Arquitetura de conteúdo e mapa do site definidos
- Stack técnica definida (pendente escolha final Astro vs Eleventy)
- Decisões-chave registradas: conteúdo AI-based (Claude Opus 4.6 + revisão humana), identidade visual a criar externamente, hospedagem flexível (kanhan.com.br ou domínio próprio)
- Git inicializado

**Decisões tomadas pelo Marcelo:**
- Framework: decidir após primeiro lote de dados (o que melhor se encaixar)
- Identidade visual: criar paralelamente (Stitch/Google, templates, ou do zero)
- Conteúdo editorial: AI-based com Claude Opus 4.6, revisão humana, escopo generoso para lançamento
- Domínio: resolver separadamente, pode ser sub de kanhan.com.br

**Próximas etapas imediatas:**
1. **Pesquisa e obtenção de dados** - Baixar microdados do Censo Escolar (INEP) e Sinopses Estatísticas como primeiro dataset. Identificar o recorte de dados para EPT.
2. **Pipeline ETL** - Criar scripts Python para processar Censo Escolar em JSONs consumíveis (matrículas por modalidade, UF, rede, eixo tecnológico, série temporal).
3. **Escolha do framework** - Com os dados processados em mãos, avaliar Astro vs Eleventy e iniciar setup do projeto.
4. **Primeiras visualizações** - Prototipar 2-3 gráficos com dados reais para validar stack de visualização.
5. **Conteúdo inicial** - Gerar com Claude: textos institucionais, panorama nacional, 5 white papers regionais.
6. **Identidade visual** - Marcelo resolve em paralelo (logo, paleta, tipografia).
