"""
Processamento de dados de empregabilidade (RAIS/CAGED).

Este script é um placeholder para quando dados reais da RAIS estiverem disponíveis.
Por enquanto, o observatório utiliza dados curados em
data/processed/empregabilidade_serie_temporal.json, estimados a partir de
publicações oficiais da RAIS/DIEESE.

Quando dados reais estiverem disponíveis:
1. Baixar tabelas agregadas da RAIS por escolaridade em data/raw/rais/
2. Este script processará os CSVs e gerará JSONs consumíveis pelo site
3. Substituir o arquivo curado pelo gerado

Fonte: RAIS (Relação Anual de Informações Sociais) - MTE
URL: https://bi.mte.gov.br/
"""

import json
import sys
from pathlib import Path

RAW_DIR = Path(__file__).parent.parent / "raw" / "rais"
PROCESSED_DIR = Path(__file__).parent.parent / "processed"


def main():
    print("=" * 60)
    print("Empregabilidade - RAIS/CAGED")
    print("=" * 60)

    # Verificar se há dados reais para processar
    if RAW_DIR.exists() and list(RAW_DIR.glob("*.csv")):
        print(f"\nArquivos encontrados em {RAW_DIR}:")
        for f in RAW_DIR.glob("*.csv"):
            print(f"  {f.name}")
        print("\nProcessamento de dados RAIS reais ainda não implementado.")
        print("Contribua com o ETL em: data/scripts/02_process_empregabilidade.py")
    else:
        print(f"\nNenhum dado RAIS encontrado em {RAW_DIR}")
        print("Usando dados curados (estimativas baseadas em publicações RAIS/DIEESE).")

    # Verificar dados curados existentes
    curated = PROCESSED_DIR / "empregabilidade_serie_temporal.json"
    if curated.exists():
        with open(curated) as f:
            data = json.load(f)
        print(f"\nDados curados disponíveis: {len(data)} anos")
        for d in data:
            print(
                f"  {d['ano']}: {d['empregados_tecnico']:,} técnicos empregados, "
                f"salário médio R${d['salario_medio_tecnico']:,}, "
                f"prêmio salarial {d['premio_salarial_pct']}%"
            )
    else:
        print("\nAVISO: Dados curados não encontrados!")
        print(f"Esperado em: {curated}")

    print(f"\n{'=' * 60}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
