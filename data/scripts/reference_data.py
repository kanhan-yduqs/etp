"""
Dados de referência para o Observatório Nacional ETP.
Dicionários de UFs, regiões e labels de modalidades EPT.
Importado por todos os scripts ETL.
"""

# Mapeamento de UFs para nome completo e região
UFS = {
    "AC": {"nome": "Acre", "regiao": "Norte"},
    "AL": {"nome": "Alagoas", "regiao": "Nordeste"},
    "AM": {"nome": "Amazonas", "regiao": "Norte"},
    "AP": {"nome": "Amapá", "regiao": "Norte"},
    "BA": {"nome": "Bahia", "regiao": "Nordeste"},
    "CE": {"nome": "Ceará", "regiao": "Nordeste"},
    "DF": {"nome": "Distrito Federal", "regiao": "Centro-Oeste"},
    "ES": {"nome": "Espírito Santo", "regiao": "Sudeste"},
    "GO": {"nome": "Goiás", "regiao": "Centro-Oeste"},
    "MA": {"nome": "Maranhão", "regiao": "Nordeste"},
    "MG": {"nome": "Minas Gerais", "regiao": "Sudeste"},
    "MS": {"nome": "Mato Grosso do Sul", "regiao": "Centro-Oeste"},
    "MT": {"nome": "Mato Grosso", "regiao": "Centro-Oeste"},
    "PA": {"nome": "Pará", "regiao": "Norte"},
    "PB": {"nome": "Paraíba", "regiao": "Nordeste"},
    "PE": {"nome": "Pernambuco", "regiao": "Nordeste"},
    "PI": {"nome": "Piauí", "regiao": "Nordeste"},
    "PR": {"nome": "Paraná", "regiao": "Sul"},
    "RJ": {"nome": "Rio de Janeiro", "regiao": "Sudeste"},
    "RN": {"nome": "Rio Grande do Norte", "regiao": "Nordeste"},
    "RO": {"nome": "Rondônia", "regiao": "Norte"},
    "RR": {"nome": "Roraima", "regiao": "Norte"},
    "RS": {"nome": "Rio Grande do Sul", "regiao": "Sul"},
    "SC": {"nome": "Santa Catarina", "regiao": "Sul"},
    "SE": {"nome": "Sergipe", "regiao": "Nordeste"},
    "SP": {"nome": "São Paulo", "regiao": "Sudeste"},
    "TO": {"nome": "Tocantins", "regiao": "Norte"},
}

REGIOES = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"]

# UFs por região (para lookups rápidos)
UFS_POR_REGIAO = {}
for sigla, info in UFS.items():
    regiao = info["regiao"]
    UFS_POR_REGIAO.setdefault(regiao, []).append(sigla)

# Modalidades de Educação Profissional Técnica
MODALIDADES_EPT = {
    "integrada": "Educação Profissional Integrada ao Ensino Médio",
    "concomitante": "Educação Profissional Concomitante",
    "subsequente": "Educação Profissional Subsequente",
}

# Redes de ensino
REDES = {
    "federal": "Federal",
    "estadual": "Estadual",
    "municipal": "Municipal",
    "privada": "Privada",
}

# Nomes de UFs para siglas (lookup reverso)
NOME_PARA_SIGLA = {info["nome"]: sigla for sigla, info in UFS.items()}

# Variações comuns nos nomes de UF nas Sinopses do INEP
NOME_UF_NORMALIZADO = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amazonas": "AM",
    "Amapá": "AP",
    "Bahia": "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Minas Gerais": "MG",
    "Mato Grosso do Sul": "MS",
    "Mato Grosso": "MT",
    "Pará": "PA",
    "Paraíba": "PB",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Paraná": "PR",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rondônia": "RO",
    "Roraima": "RR",
    "Rio Grande do Sul": "RS",
    "Santa Catarina": "SC",
    "Sergipe": "SE",
    "São Paulo": "SP",
    "Tocantins": "TO",
}
