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
Chart.defaults.plugins.legend.labels.pointStyle = 'rect';
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

// Global registry so theme toggle can update all charts
(window as any).__etp_charts = (window as any).__etp_charts || [] as Chart[];

export function registerChart(chart: Chart) {
  (window as any).__etp_charts.push(chart);
}

// Watch for dark mode toggle and update all charts
if (!(window as any).__etp_theme_watcher) {
  (window as any).__etp_theme_watcher = true;
  const observer = new MutationObserver(() => {
    const s = getComputedStyle(document.documentElement);
    const textColor = s.getPropertyValue('--chart-text').trim() || '#41484c';
    const gridColor = s.getPropertyValue('--chart-grid').trim() || 'rgba(0,0,0,0.04)';
    const chartColors = Array.from({ length: 8 }, (_, i) =>
      s.getPropertyValue(`--chart-${i + 1}`).trim()
    ).filter(c => c);

    ((window as any).__etp_charts as Chart[]).forEach(chart => {
      // Update text colors
      chart.options.color = textColor;
      if (chart.options.scales) {
        Object.values(chart.options.scales).forEach((scale: any) => {
          if (scale.ticks) scale.ticks.color = textColor;
          if (scale.grid) scale.grid.color = gridColor;
          if (scale.title) scale.title.color = textColor;
        });
      }
      if (chart.options.plugins?.legend?.labels) {
        (chart.options.plugins.legend.labels as any).color = textColor;
      }

      // Update dataset colors
      if (chartColors.length) {
        chart.data.datasets.forEach((ds: any, i: number) => {
          const color = chartColors[i % chartColors.length];
          if (Array.isArray(ds.backgroundColor)) {
            ds.backgroundColor = ds.backgroundColor.map((_: any, j: number) => chartColors[j % chartColors.length]);
          } else if (ds.type === 'line' || chart.config.type === 'line') {
            ds.borderColor = color;
            ds.pointBackgroundColor = color;
            // Transparent fill
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            ds.backgroundColor = `rgba(${r},${g},${b},0.1)`;
          } else {
            ds.backgroundColor = color;
          }
        });
      }

      chart.update('none');
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

export { Chart };
