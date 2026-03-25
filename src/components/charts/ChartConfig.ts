/**
 * Configuração compartilhada do Chart.js para o Observatório Nacional ETP.
 * Registra apenas os componentes necessários (tree-shaking).
 */

import {
  Chart,
  LineController,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chart.register(
  LineController,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// Defaults globais
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#41484c'; // on-surface-variant
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 37, 50, 0.9)';
Chart.defaults.plugins.tooltip.titleFont = { family: "'Space Grotesk', system-ui", size: 13, weight: '600' };
Chart.defaults.plugins.tooltip.bodyFont = { family: "'Space Grotesk', system-ui", size: 12, weight: '400' };
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

export { Chart };
