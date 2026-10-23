export function getChartPalette({ document: page = globalThis.document } = {}) {
  return page.body.classList.contains("theme-dark")
    ? { surface: "#101014", text: "#f5f5f7", muted: "#c5c7cf", grid: "#44444e" }
    : { surface: "#fff", text: "#16161b", muted: "#5c6068", grid: "#d8dbe0" };
}

export function themeChartOptions(options = {}, palette = getChartPalette()) {
  const scales = options.scales || {};
  const axes = new Set(["x", "y", ...Object.keys(scales)]);
  return {
    ...options,
    color: palette.text,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        labels: { ...options.plugins?.legend?.labels, color: palette.muted }
      },
      tooltip: {
        ...options.plugins?.tooltip,
        backgroundColor: palette.surface,
        titleColor: palette.text,
        bodyColor: palette.text,
        borderColor: palette.grid,
        borderWidth: 1
      }
    },
    scales: Object.fromEntries([...axes].map(id => [id, {
      ...scales[id],
      ticks: { ...scales[id]?.ticks, color: palette.muted },
      title: { ...scales[id]?.title, color: palette.text },
      grid: { ...scales[id]?.grid, color: palette.grid },
      border: { ...scales[id]?.border, color: palette.grid }
    }]))
  };
}

export function createThemedChart(Chart, canvas, config) {
  return new Chart(canvas, { ...config, options: themeChartOptions(config.options) });
}

export function refreshChartTheme(charts) {
  for (const chart of charts.filter(Boolean)) {
    chart.options = themeChartOptions(chart.config.options);
    chart.update("none");
  }
}
