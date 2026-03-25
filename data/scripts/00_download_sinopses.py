"""
Download das Sinopses Estatísticas da Educação Básica do INEP.

Baixa os arquivos Excel das Sinopses para data/raw/.
Os arquivos contêm tabelas pré-agregadas do Censo Escolar.

Uso:
    python 00_download_sinopses.py              # baixa todos os anos disponíveis
    python 00_download_sinopses.py --anos 2023 2024  # baixa anos específicos

Fonte: https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/sinopses-estatisticas
"""

import argparse
import os
import sys
from pathlib import Path

import requests

# Diretório de destino
RAW_DIR = Path(__file__).parent.parent / "raw"

# URLs conhecidas das Sinopses (padrão INEP, pode mudar)
# Formato típico: sinopse_estatistica_da_educacao_basica_{ano}.zip
# Os links reais podem ser .xlsx direto ou .zip contendo .xlsx
URLS_SINOPSES = {
    2019: "https://download.inep.gov.br/informacoes_estatisticas/sinopses_estatisticas/sinopses_educacao_basica/sinopse_estatistica_educacao_basica_2019.zip",
    2020: "https://download.inep.gov.br/dados_abertos/sinopses_estatisticas/sinopses_estatisticas_censo_escolar_2020.zip",
    2021: "https://download.inep.gov.br/dados_abertos/sinopses_estatisticas/sinopses_estatisticas_censo_escolar_2021.zip",
    2022: "https://download.inep.gov.br/dados_abertos/sinopses_estatisticas/sinopses_estatisticas_censo_escolar_2022.zip",
    2023: "https://download.inep.gov.br/dados_abertos/sinopses_estatisticas/sinopses_estatisticas_censo_escolar_2023.zip",
    2024: "https://download.inep.gov.br/dados_abertos/sinopses_estatisticas/sinopses_estatisticas_censo_escolar_2024.zip",
}


def download_file(url: str, dest: Path) -> bool:
    """Baixa um arquivo da URL para o destino. Retorna True se sucesso."""
    print(f"  Baixando: {url}")
    print(f"  Destino:  {dest}")
    try:
        response = requests.get(url, stream=True, timeout=120)
        response.raise_for_status()
        total = int(response.headers.get("content-length", 0))
        downloaded = 0
        with open(dest, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                downloaded += len(chunk)
                if total > 0:
                    pct = downloaded / total * 100
                    print(f"\r  Progresso: {pct:.0f}%", end="", flush=True)
        print()
        print(f"  OK ({downloaded / 1024 / 1024:.1f} MB)")
        return True
    except requests.RequestException as e:
        print(f"  ERRO: {e}")
        print(f"  Baixe manualmente de: {url}")
        print(f"  Salve em: {dest}")
        return False


def extract_zip(zip_path: Path, dest_dir: Path):
    """Extrai um ZIP para o diretório de destino."""
    import zipfile

    print(f"  Extraindo: {zip_path.name}")
    with zipfile.ZipFile(zip_path, "r") as zf:
        # Listar conteúdo
        xlsx_files = [f for f in zf.namelist() if f.endswith((".xlsx", ".xls"))]
        if xlsx_files:
            for f in xlsx_files:
                print(f"    -> {f}")
                zf.extract(f, dest_dir)
        else:
            # Extrai tudo se não encontrar xlsx
            zf.extractall(dest_dir)
            print(f"    -> {len(zf.namelist())} arquivos extraídos")


def main():
    parser = argparse.ArgumentParser(
        description="Download das Sinopses Estatísticas do INEP"
    )
    parser.add_argument(
        "--anos",
        nargs="+",
        type=int,
        default=list(URLS_SINOPSES.keys()),
        help="Anos para baixar (default: todos disponíveis)",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        default=True,
        help="Pular arquivos já baixados (default: True)",
    )
    args = parser.parse_args()

    RAW_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("Download - Sinopses Estatísticas da Educação Básica (INEP)")
    print("=" * 60)

    sucesso = []
    falha = []

    for ano in sorted(args.anos):
        print(f"\n--- {ano} ---")
        url = URLS_SINOPSES.get(ano)
        if not url:
            print(f"  URL não cadastrada para {ano}. Pule ou adicione manualmente.")
            falha.append(ano)
            continue

        filename = f"sinopse_educacao_basica_{ano}.zip"
        dest = RAW_DIR / filename

        # Verificar se já existe (zip ou xlsx)
        xlsx_pattern = list(RAW_DIR.glob(f"*{ano}*.xlsx"))
        if args.skip_existing and (dest.exists() or xlsx_pattern):
            existing = dest.name if dest.exists() else xlsx_pattern[0].name
            print(f"  Já existe: {existing} (pulando)")
            sucesso.append(ano)
            continue

        if download_file(url, dest):
            if dest.suffix == ".zip":
                extract_zip(dest, RAW_DIR)
            sucesso.append(ano)
        else:
            falha.append(ano)

    print("\n" + "=" * 60)
    print(f"Concluído: {len(sucesso)} OK, {len(falha)} com erro")
    if falha:
        print(f"\nAnos com erro: {falha}")
        print(
            "\nBaixe manualmente de:"
            "\nhttps://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/sinopses-estatisticas"
        )
        print(f"Salve os arquivos .xlsx em: {RAW_DIR.resolve()}")
    print("=" * 60)

    return 0 if not falha else 1


if __name__ == "__main__":
    sys.exit(main())
