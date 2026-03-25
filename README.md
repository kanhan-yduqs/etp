# Observatório Nacional ETP

Plataforma web de referência sobre o Ensino Técnico e Profissionalizante no Brasil. Consolida dados do INEP, IBGE, MTE e organismos internacionais em visualizações interativas e análises de profundidade.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (static site generation)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Gráficos:** [Chart.js](https://www.chartjs.org/)
- **Dados:** JSON estáticos gerados por pipeline Python (pandas)
- **Fontes:** Inter + Space Grotesk

## Quick Start

```bash
npm install
npm run dev       # dev server em http://localhost:4321
npm run build     # build estático em dist/
npm run preview   # preview do build
```

## Pipeline de Dados

Os dados são extraídos das Sinopses Estatísticas da Educação Básica (INEP/MEC):

```bash
cd data
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt

# Baixar Sinopses (ou colocar manualmente os .xlsx em data/raw/)
python scripts/00_download_sinopses.py

# Processar e gerar JSONs
python scripts/01_process_sinopses.py
```

Os JSONs gerados em `data/processed/` são consumidos pelo Astro em build time.

## Estrutura

```
├── data/
│   ├── raw/           # Excels originais do INEP (.gitignored)
│   ├── processed/     # JSONs tratados (commitados)
│   └── scripts/       # Pipeline ETL (Python)
├── design/reference/  # Templates Stitch (light + dark)
├── src/
│   ├── components/    # Componentes Astro (Header, BigNumber, Charts, etc.)
│   ├── layouts/       # BaseLayout
│   ├── lib/           # Utilitários de dados (TypeScript)
│   ├── pages/         # Rotas do site
│   └── styles/        # CSS global + Tailwind
├── CLAUDE.md          # Especificação do projeto
└── README.md
```

## Licença

MIT
