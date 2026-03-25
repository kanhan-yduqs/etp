/**
 * Utilitários de carregamento de dados para o Observatório Nacional ETP.
 * Todos os dados são importados estaticamente em build time (Astro SSG).
 */

import serieTemporal from '../../data/processed/matriculas_ept_serie_temporal.json';
import porUf from '../../data/processed/matriculas_ept_por_uf.json';
import porModalidade from '../../data/processed/matriculas_ept_por_modalidade.json';
import porRegiao from '../../data/processed/matriculas_ept_por_regiao.json';
import metadata from '../../data/processed/metadata.json';

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
