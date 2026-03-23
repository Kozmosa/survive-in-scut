const KATEX_CSS =
  "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
const KATEX_JS = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";

const LATEX_FORMULAS = {
  bernoulli: {
    pmf: [String.raw`P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\}`],
    cdf: [
      String.raw`F(x)=\begin{cases}0, & x<0\\1-p, & 0\le x<1\\1, & x\ge 1\end{cases}`,
    ],
  },
  binomial: {
    pmf: [String.raw`P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\quad k=0,1,\ldots,n`],
    cdf: [
      String.raw`F(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{n}{k}p^k(1-p)^{n-k}`,
    ],
  },
  poisson: {
    pmf: [
      String.raw`P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},\quad k=0,1,2,\ldots`,
    ],
    cdf: [
      String.raw`F(x)=\sum_{k=0}^{\lfloor x\rfloor}e^{-\lambda}\frac{\lambda^k}{k!}`,
    ],
  },
  geometric: {
    pmf: [String.raw`P(X=k)=(1-p)^{k-1}p,\quad k=1,2,3,\ldots`],
    cdf: [
      String.raw`F(x)=\begin{cases}0, & x<1\\1-(1-p)^{\lfloor x\rfloor}, & x\ge 1\end{cases}`,
    ],
  },
  "negative-binomial": {
    pmf: [
      String.raw`P(X=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r},\quad k=r,r+1,\ldots`,
    ],
    cdf: [
      String.raw`F(x)=\sum_{k=r}^{\lfloor x\rfloor}\binom{k-1}{r-1}p^r(1-p)^{k-r}`,
    ],
  },
  hypergeometric: {
    pmf: [String.raw`P(X=k)=\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}`],
    cdf: [
      String.raw`F(x)=\sum_{k=k_{\min}}^{\lfloor x\rfloor}\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}`,
    ],
  },
  uniform: {
    pdf: [
      String.raw`f(x)=\begin{cases}\dfrac{1}{b-a}, & a\le x\le b\\0, & \text{otherwise}\end{cases}`,
    ],
    cdf: [
      String.raw`F(x)=\begin{cases}0, & x<a\\\dfrac{x-a}{b-a}, & a\le x\le b\\1, & x>b\end{cases}`,
    ],
  },
  exponential: {
    pdf: [
      String.raw`f(x)=\begin{cases}\lambda e^{-\lambda x}, & x\ge 0\\0, & x<0\end{cases}`,
    ],
    cdf: [
      String.raw`F(x)=\begin{cases}0, & x<0\\1-e^{-\lambda x}, & x\ge 0\end{cases}`,
    ],
  },
  normal: {
    pdf: [
      String.raw`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),\quad x\in\mathbb{R}`,
    ],
    cdf: [String.raw`F(x)=\Phi\!\left(\frac{x-\mu}{\sigma}\right)`],
  },
  gamma: {
    pdf: [
      String.raw`f(x)=\frac{x^{\alpha-1}e^{-x/\theta}}{\Gamma(\alpha)\theta^{\alpha}},\quad x>0`,
    ],
    cdf: [
      String.raw`F(x)=\frac{\gamma(\alpha,x/\theta)}{\Gamma(\alpha)},\quad x>0`,
    ],
  },
  beta: {
    pdf: [
      String.raw`f(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)},\quad 0<x<1`,
    ],
    cdf: [String.raw`F(x)=I_x(\alpha,\beta),\quad 0\le x\le 1`],
  },
  cauchy: {
    pdf: [
      String.raw`f(x)=\frac{1}{\pi\gamma\left[1+\left(\frac{x-x_0}{\gamma}\right)^2\right]},\quad x\in\mathbb{R}`,
    ],
    cdf: [
      String.raw`F(x)=\frac{1}{2}+\frac{1}{\pi}\arctan\!\left(\frac{x-x_0}{\gamma}\right)`,
    ],
  },
  lognormal: {
    pdf: [
      String.raw`f(x)=\frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x-\mu)^2}{2\sigma^2}\right),\quad x>0`,
    ],
    cdf: [
      String.raw`F(x)=\Phi\!\left(\frac{\ln x-\mu}{\sigma}\right),\quad x>0`,
    ],
  },
  chisquare: {
    pdf: [
      String.raw`f(x)=\frac{x^{\nu/2-1}e^{-x/2}}{2^{\nu/2}\Gamma(\nu/2)},\quad x>0`,
    ],
    cdf: [String.raw`F(x)=\frac{\gamma(\nu/2,x/2)}{\Gamma(\nu/2)},\quad x>0`],
  },
  t: {
    pdf: [
      String.raw`f(x)=\frac{\Gamma\!\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\!\left(\frac{\nu}{2}\right)}\left(1+\frac{x^2}{\nu}\right)^{-\frac{\nu+1}{2}},\quad x\in\mathbb{R}`,
    ],
    cdf: [
      String.raw`F(x)=\int_{-\infty}^{x}\frac{\Gamma\!\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\!\left(\frac{\nu}{2}\right)}\left(1+\frac{t^2}{\nu}\right)^{-\frac{\nu+1}{2}}\,dt`,
    ],
  },
  f: {
    pdf: [
      String.raw`f(x)=\frac{1}{B\!\left(\frac{d_1}{2},\frac{d_2}{2}\right)}\left(\frac{d_1}{d_2}\right)^{d_1/2}x^{d_1/2-1}\left(1+\frac{d_1x}{d_2}\right)^{-\frac{d_1+d_2}{2}},\quad x>0`,
    ],
    cdf: [
      String.raw`F(x)=I_{\frac{d_1x}{d_1x+d_2}}\!\left(\frac{d_1}{2},\frac{d_2}{2}\right),\quad x>0`,
    ],
  },
  multinomial: {
    scatter3d: [
      String.raw`P(X_1=x_1,X_2=x_2,X_3=x_3)=\frac{n!}{x_1!x_2!x_3!}p_1^{x_1}p_2^{x_2}p_3^{x_3}`,
      String.raw`x_1+x_2+x_3=n,\quad x_1,x_2,x_3\in\mathbb{Z}_{\ge 0},\quad p_3=1-p_1-p_2`,
    ],
    heatmap: [
      String.raw`P(X_1=x_1,X_2=x_2,X_3=x_3)=\frac{n!}{x_1!x_2!x_3!}p_1^{x_1}p_2^{x_2}p_3^{x_3}`,
      String.raw`x_1+x_2+x_3=n,\quad x_1,x_2,x_3\in\mathbb{Z}_{\ge 0},\quad p_3=1-p_1-p_2`,
    ],
  },
  "bivariate-normal": {
    surface: [
      String.raw`f(x,y)=\frac{1}{2\pi\sigma_x\sigma_y\sqrt{1-\rho^2}}\exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_x}{\sigma_x}\right)^2-2\rho\left(\frac{x-\mu_x}{\sigma_x}\right)\left(\frac{y-\mu_y}{\sigma_y}\right)+\left(\frac{y-\mu_y}{\sigma_y}\right)^2\right]\right)`,
    ],
    contour: [
      String.raw`f(x,y)=\frac{1}{2\pi\sigma_x\sigma_y\sqrt{1-\rho^2}}\exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_x}{\sigma_x}\right)^2-2\rho\left(\frac{x-\mu_x}{\sigma_x}\right)\left(\frac{y-\mu_y}{\sigma_y}\right)+\left(\frac{y-\mu_y}{\sigma_y}\right)^2\right]\right)`,
    ],
  },
  "bivariate-uniform": {
    surface: [
      String.raw`f(x,y)=\begin{cases}\dfrac{1}{(b-a)(d-c)}, & a\le x\le b,\ c\le y\le d\\0, & \text{otherwise}\end{cases}`,
    ],
    contour: [
      String.raw`f(x,y)=\begin{cases}\dfrac{1}{(b-a)(d-c)}, & a\le x\le b,\ c\le y\le d\\0, & \text{otherwise}\end{cases}`,
    ],
  },
};

const FORMULA_BLOCK_HELPER = `
  const LATEX_FORMULAS = ${JSON.stringify(LATEX_FORMULAS)};

  function getLatexFormulaLines(dist, view) {
    const byDist = LATEX_FORMULAS[dist.id];
    if (!byDist) return [];
    const lines = byDist[view] || [];
    return Array.isArray(lines) ? lines : [];
  }

  function splitTextFormula(rawFormula) {
    if (rawFormula == null) return [];
    const source = String(rawFormula).replace(/\\r\\n/g, "\\n").trim();
    return source ? source.split("\\n") : [];
  }

  function createFormulaBlockRenderer(options) {
    const labelEl = options.labelEl;
    const boxEl = options.boxEl;
    const noteEl = options.noteEl;

    function hasKatex() {
      return typeof window.katex !== "undefined" && !!window.katex.renderToString;
    }

    function renderFallback(lines) {
      boxEl.textContent = lines.join("\\n");
    }

    function renderLatex(lines, fallbackLines) {
      const html = lines
        .map(function (line, index) {
          try {
            return '<div class="formula-line">' +
              window.katex.renderToString(line, {
                displayMode: true,
                throwOnError: false,
                strict: "ignore",
              }) +
              "</div>";
          } catch (error) {
            const fallback = fallbackLines[index] || line;
            return '<div class="formula-line formula-line-fallback">' + fallback + "</div>";
          }
        })
        .join("");
      boxEl.innerHTML = html;
    }

    return {
      render: function renderFormulaBlock(payload) {
        const label = payload.label || "";
        const note = payload.note || "";
        const latexLines = payload.latexLines || [];
        const rawFormula = payload.rawFormula || "";
        const fallbackLines = splitTextFormula(rawFormula);

        labelEl.textContent = label;
        noteEl.textContent = note;

        if (!fallbackLines.length && !latexLines.length) {
          boxEl.textContent = "";
          return;
        }

        if (hasKatex() && latexLines.length) {
          renderLatex(latexLines, fallbackLines);
          return;
        }

        renderFallback(fallbackLines);
      },
    };
  }
`;

const NORMAL_VISUAL_LOCK_HELPER = String.raw`
  function applyNormalVisualLock(spec, dist, view) {
    if (!spec || !dist || dist.id !== "normal") {
      return spec;
    }

    const xMin = -8;
    const xMax = 8;
    const xAxis = spec.layout.xaxis || (spec.layout.xaxis = {});
    const yAxis = spec.layout.yaxis || (spec.layout.yaxis = {});

    xAxis.autorange = false;
    xAxis.range = [xMin, xMax];

    const sampleCount = 320;
    const step = (xMax - xMin) / sampleCount;
    const refX = [];
    const refY = [];
    const refCdfY = [];

    for (let i = 0; i <= sampleCount; i += 1) {
      const x = xMin + i * step;
      refX.push(x);
      refY.push(normalPdf(x, 0, 1));
      refCdfY.push(normalCdf(x, 0, 1));
    }

    spec.data = (spec.data || []).filter(function (trace) {
      return !trace.__normalReference;
    });

    if (view === "pdf") {
      yAxis.autorange = false;
      yAxis.range = [0, 1.5];
      spec.data.push({
        x: refX,
        y: refY,
        mode: "lines",
        name: "标准正态参考 N(0,1)",
        line: {
          width: 2,
          dash: "dash",
          color: "#6b7280",
        },
        hovertemplate: "x=%{x:.2f}<br>f_{N(0,1)}=%{y:.4f}<extra></extra>",
        __normalReference: true,
      });
    } else {
      yAxis.autorange = false;
      yAxis.range = [0, 1];
      spec.data.push({
        x: refX,
        y: refCdfY,
        mode: "lines",
        name: "标准正态参考 N(0,1)",
        line: {
          width: 2,
          dash: "dash",
          color: "#6b7280",
        },
        hovertemplate: "x=%{x:.2f}<br>F_{N(0,1)}=%{y:.4f}<extra></extra>",
        __normalReference: true,
      });
    }

    spec.layout.showlegend = true;
    spec.layout.legend = Object.assign(
      {
        orientation: "h",
        yanchor: "bottom",
        y: 1.02,
        xanchor: "left",
        x: 0,
      },
      spec.layout.legend || {},
    );

    return spec;
  }
`;

const RENDER_INFO_PATCH = `
    els.formulaBlock.render({
      label: formulaLabel(view),
      latexLines: getLatexFormulaLines(dist, view),
      rawFormula: dist.formula(view, params),
      note: formulaNoteText(dist, view),
    });`;

const SCHEDULE_PLOT_PATCH = `
      applyNormalVisualLock(spec, dist, view);
      spec.layout.uirevision = dist.id + "-" + view;
      Plotly.react(els.plot, spec.data, spec.layout, spec.config);`;

export function buildIntegratedGalleryHtml(rawHtml) {
  let html = rawHtml;

  html = html.replace(
    '<pre id="formulaBox" class="formula-box"></pre>',
    '<div id="formulaBox" class="formula-box"></div>',
  );

  html = html.replace(
    ".formula-box {",
    `.formula-box {
  overflow: auto;
}
.formula-line + .formula-line {
  margin-top: 8px;
}
.formula-line .katex-display {
  margin: 0;
}
.formula-line-fallback {
  font-family: "SFMono-Regular", Consolas, Menlo, monospace;
  font-size: 13px;
  white-space: pre-wrap;
}

.formula-box {`,
  );

  html = html.replace(
    "range(params) { return [params.mu - 4.5 * params.sigma, params.mu + 4.5 * params.sigma]; },",
    "range() { return [-8, 8]; },",
  );

  html = html.replace(
    "    formulaLabel: document.getElementById('formulaLabel'),\n    formulaBox: document.getElementById('formulaBox'),\n    formulaNote: document.getElementById('formulaNote'),",
    "    formulaLabel: document.getElementById('formulaLabel'),\n    formulaBox: document.getElementById('formulaBox'),\n    formulaNote: document.getElementById('formulaNote'),\n    formulaBlock: null,",
  );

  html = html.replace(
    "  function formulaLabel(view) {",
    `${FORMULA_BLOCK_HELPER}\n\n${NORMAL_VISUAL_LOCK_HELPER}\n\n  function formulaLabel(view) {`,
  );

  html = html.replace(
    "  function renderInfoOnly() {",
    "  els.formulaBlock = createFormulaBlockRenderer({\n    labelEl: els.formulaLabel,\n    boxEl: els.formulaBox,\n    noteEl: els.formulaNote,\n  });\n\n  function renderInfoOnly() {",
  );

  html = html.replace(
    "  els.searchInput.addEventListener('input', function (e) {",
    "  if (els.searchInput) els.searchInput.addEventListener('input', function (e) {",
  );

  html = html.replace(
    "  els.searchInput.addEventListener('keydown', function (e) {",
    "  if (els.searchInput) els.searchInput.addEventListener('keydown', function (e) {",
  );

  html = html.replace(
    "  els.clearSearchBtn.addEventListener('click', function () {",
    "  if (els.clearSearchBtn) els.clearSearchBtn.addEventListener('click', function () {",
  );

  html = html.replace(
    "  els.resetParamsBtn.addEventListener('click', function () {",
    "  if (els.resetParamsBtn) els.resetParamsBtn.addEventListener('click', function () {",
  );

  html = html.replace(
    "    els.formulaLabel.textContent = formulaLabel(view);\n    els.formulaBox.textContent = dist.formula(view, params);\n    els.formulaNote.textContent = formulaNoteText(dist, view);",
    RENDER_INFO_PATCH,
  );

  html = html.replace(
    "      spec.layout.uirevision = dist.id + '-' + view;\n      Plotly.react(els.plot, spec.data, spec.layout, spec.config);",
    SCHEDULE_PLOT_PATCH,
  );

  html = html.replace(
    "  renderSidebar();\n  renderSelection();",
    '  function rerenderFormulaWhenKatexReady() {\n    if (window.katex && window.katex.renderToString) {\n      renderInfoOnly();\n      return;\n    }\n    const katexScript = document.querySelector(\'script[data-prob-katex="1"]\');\n    if (!katexScript) {\n      return;\n    }\n    katexScript.addEventListener("load", function () {\n      renderInfoOnly();\n    }, { once: true });\n  }\n\n  renderSidebar();\n  renderSelection();\n  rerenderFormulaWhenKatexReady();',
  );

  const katexLinkTag = `  <link rel="stylesheet" href="${KATEX_CSS}" />\n`;
  const katexScriptTag =
    `  <script defer data-prob-katex="1" src="${KATEX_JS}"><` + "/script>\n";
  html = html.replace("</head>", `${katexLinkTag}${katexScriptTag}</head>`);

  return html;
}
