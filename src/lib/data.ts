/**
 * Utilitários de carregamento de dados para o Observatório Nacional ETP.
 * Todos os dados são importados estaticamente em build time (Astro SSG).
 */

import serieTemporal from '../../data/processed/matriculas_ept_serie_temporal.json';
import porUf from '../../data/processed/matriculas_ept_por_uf.json';
import porModalidade from '../../data/processed/matriculas_ept_por_modalidade.json';
import porRegiao from '../../data/processed/matriculas_ept_por_regiao.json';
import metadata from '../../data/processed/metadata.json';
import comparacoesData from '../../data/processed/comparacoes_internacionais.json';
import empregabilidadeData from '../../data/processed/empregabilidade_serie_temporal.json';

// --- Interfaces ---

export interface SerieTemporal {
  ano: number;
  total: number;
  publica: number;
  privada: number;
  federal: number;
  estadual: number;
  municipal: number;
}

export interface MatriculaUF {
  ano: number;
  sigla_uf: string;
  nome_uf: string;
  regiao: string;
  total: number;
  federal: number;
  estadual: number;
  municipal: number;
  privada: number;
  publica: number;
  modalidades: Record<string, number>;
}

export interface MatriculaModalidade {
  ano: number;
  modalidade: string;
  total: number;
}

export interface MatriculaRegiao {
  ano: number;
  regiao: string;
  total: number;
  modalidades: Record<string, number>;
}

export interface Metadata {
  fonte: string;
  url_fonte: string;
  data_processamento: string;
  anos_cobertos: number[];
  total_registros_uf: number;
  total_registros_regiao: number;
  modalidades_incluidas: string[];
  notas: string[];
}

// --- Funções de acesso ---

export function getSerieTemporal(): SerieTemporal[] {
  return serieTemporal as SerieTemporal[];
}

export function getMatriculasPorUF(ano?: number): MatriculaUF[] {
  const data = porUf as MatriculaUF[];
  return ano ? data.filter(d => d.ano === ano) : data;
}

export function getMatriculasPorModalidade(ano?: number): MatriculaModalidade[] {
  const data = porModalidade as MatriculaModalidade[];
  return ano ? data.filter(d => d.ano === ano) : data;
}

export function getMatriculasPorRegiao(ano?: number): MatriculaRegiao[] {
  const data = porRegiao as MatriculaRegiao[];
  return ano ? data.filter(d => d.ano === ano) : data;
}

export function getMetadata(): Metadata {
  return metadata as Metadata;
}

export function getLatestYear(): number {
  const anos = (metadata as Metadata).anos_cobertos;
  return Math.max(...anos);
}

// --- Helpers de formatação ---

export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace('.', ',') + 'M';
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(0) + 'k';
  }
  return n.toLocaleString('pt-BR');
}

export function formatPercent(value: number, decimals = 1): string {
  return value.toFixed(decimals).replace('.', ',') + '%';
}

export function calcGrowthPercent(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/** Labels de modalidade legíveis */
export const MODALIDADE_LABELS: Record<string, string> = {
  integrada: 'Integrada ao EM',
  concomitante: 'Concomitante',
  subsequente: 'Subsequente',
  integrada_eja: 'Integrada à EJA',
};

/** Cores para modalidades (consistentes com design system) */
export const MODALIDADE_COLORS: Record<string, string> = {
  integrada: '#0D3B4C',
  concomitante: '#476800',
  subsequente: '#4a6d00',
  integrada_eja: '#2d6195',
};

// --- Empregabilidade ---

export interface EmpregabilidadeSerie {
  ano: number;
  empregados_tecnico: number;
  empregados_medio: number;
  empregados_superior: number;
  salario_medio_tecnico: number;
  salario_medio_medio: number;
  salario_medio_superior: number;
  premio_salarial_pct: number;
  fonte: string;
}

export function getEmpregabilidadeSerie(): EmpregabilidadeSerie[] {
  return empregabilidadeData as EmpregabilidadeSerie[];
}

export function getEmpregabilidadeLatest(): EmpregabilidadeSerie {
  const data = empregabilidadeData as EmpregabilidadeSerie[];
  return data[data.length - 1];
}

export function formatCurrency(value: number): string {
  return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// --- Comparações Internacionais ---

export interface ComparacaoInternacional {
  country: string;
  iso3: string;
  vetEnrollmentRate: number;
  publicInvestment: number;
  employability12m: number;
  vetModel: string;
  vetModelLabel: string;
}

export function getComparacoesInternacionais(): ComparacaoInternacional[] {
  return comparacoesData as ComparacaoInternacional[];
}

// --- Helpers para Perfis Estaduais ---

/** Todos os anos de uma UF */
export function getUFData(sigla: string): MatriculaUF[] {
  return (porUf as MatriculaUF[]).filter(d => d.sigla_uf === sigla.toUpperCase());
}

/** Último ano de uma UF */
export function getUFLatest(sigla: string): MatriculaUF | undefined {
  const data = getUFData(sigla);
  const latest = getLatestYear();
  return data.find(d => d.ano === latest);
}

/** Lista de todas as siglas UF (lowercase, para slugs) */
export function getAllUFSlugs(): string[] {
  const siglas = new Set((porUf as MatriculaUF[]).map(d => d.sigla_uf));
  return [...siglas].sort().map(s => s.toLowerCase());
}

/** Média regional para um ano */
export function getRegionAverage(regiao: string, ano: number): { total: number; publica: number; privada: number } {
  const ufs = (porUf as MatriculaUF[]).filter(d => d.regiao === regiao && d.ano === ano);
  if (ufs.length === 0) return { total: 0, publica: 0, privada: 0 };
  return {
    total: Math.round(ufs.reduce((s, u) => s + u.total, 0) / ufs.length),
    publica: Math.round(ufs.reduce((s, u) => s + u.publica, 0) / ufs.length),
    privada: Math.round(ufs.reduce((s, u) => s + u.privada, 0) / ufs.length),
  };
}

/** Média nacional para um ano */
export function getNationalAverage(ano: number): { total: number; publica: number; privada: number } {
  const ufs = (porUf as MatriculaUF[]).filter(d => d.ano === ano);
  if (ufs.length === 0) return { total: 0, publica: 0, privada: 0 };
  return {
    total: Math.round(ufs.reduce((s, u) => s + u.total, 0) / ufs.length),
    publica: Math.round(ufs.reduce((s, u) => s + u.publica, 0) / ufs.length),
    privada: Math.round(ufs.reduce((s, u) => s + u.privada, 0) / ufs.length),
  };
}

/** Modalidade dominante de uma UF */
export function getDominantModalidade(uf: MatriculaUF): string {
  const mods = uf.modalidades;
  const technicalMods = ['integrada', 'concomitante', 'subsequente', 'integrada_eja'];
  let max = 0;
  let dominant = 'subsequente';
  for (const mod of technicalMods) {
    if ((mods[mod] || 0) > max) {
      max = mods[mod] || 0;
      dominant = mod;
    }
  }
  return MODALIDADE_LABELS[dominant] || dominant;
}
