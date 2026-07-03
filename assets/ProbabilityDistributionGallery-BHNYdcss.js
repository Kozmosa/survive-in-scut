import{B as e,D as t,W as n,_ as r,h as i,k as a,t as o,v as s}from"./app-BUuNeDBb.js";var c=`/assets/gallerySource-Cw5dIr-Y.html`,l=`https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css`,u=`https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js`,d={bernoulli:{pmf:[String.raw`P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\}`],cdf:[String.raw`F(x)=\begin{cases}0, & x<0\\1-p, & 0\le x<1\\1, & x\ge 1\end{cases}`]},binomial:{pmf:[String.raw`P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\quad k=0,1,\ldots,n`],cdf:[String.raw`F(x)=\sum_{k=0}^{\lfloor x\rfloor}\binom{n}{k}p^k(1-p)^{n-k}`]},poisson:{pmf:[String.raw`P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},\quad k=0,1,2,\ldots`],cdf:[String.raw`F(x)=\sum_{k=0}^{\lfloor x\rfloor}e^{-\lambda}\frac{\lambda^k}{k!}`]},geometric:{pmf:[String.raw`P(X=k)=(1-p)^{k-1}p,\quad k=1,2,3,\ldots`],cdf:[String.raw`F(x)=\begin{cases}0, & x<1\\1-(1-p)^{\lfloor x\rfloor}, & x\ge 1\end{cases}`]},"negative-binomial":{pmf:[String.raw`P(X=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r},\quad k=r,r+1,\ldots`],cdf:[String.raw`F(x)=\sum_{k=r}^{\lfloor x\rfloor}\binom{k-1}{r-1}p^r(1-p)^{k-r}`]},hypergeometric:{pmf:[String.raw`P(X=k)=\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}`],cdf:[String.raw`F(x)=\sum_{k=k_{\min}}^{\lfloor x\rfloor}\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}`]},uniform:{pdf:[String.raw`f(x)=\begin{cases}\dfrac{1}{b-a}, & a\le x\le b\\0, & \text{otherwise}\end{cases}`],cdf:[String.raw`F(x)=\begin{cases}0, & x<a\\\dfrac{x-a}{b-a}, & a\le x\le b\\1, & x>b\end{cases}`]},exponential:{pdf:[String.raw`f(x)=\begin{cases}\lambda e^{-\lambda x}, & x\ge 0\\0, & x<0\end{cases}`],cdf:[String.raw`F(x)=\begin{cases}0, & x<0\\1-e^{-\lambda x}, & x\ge 0\end{cases}`]},normal:{pdf:[String.raw`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),\quad x\in\mathbb{R}`],cdf:[String.raw`F(x)=\Phi\!\left(\frac{x-\mu}{\sigma}\right)`]},gamma:{pdf:[String.raw`f(x)=\frac{x^{\alpha-1}e^{-x/\theta}}{\Gamma(\alpha)\theta^{\alpha}},\quad x>0`],cdf:[String.raw`F(x)=\frac{\gamma(\alpha,x/\theta)}{\Gamma(\alpha)},\quad x>0`]},beta:{pdf:[String.raw`f(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)},\quad 0<x<1`],cdf:[String.raw`F(x)=I_x(\alpha,\beta),\quad 0\le x\le 1`]},cauchy:{pdf:[String.raw`f(x)=\frac{1}{\pi\gamma\left[1+\left(\frac{x-x_0}{\gamma}\right)^2\right]},\quad x\in\mathbb{R}`],cdf:[String.raw`F(x)=\frac{1}{2}+\frac{1}{\pi}\arctan\!\left(\frac{x-x_0}{\gamma}\right)`]},lognormal:{pdf:[String.raw`f(x)=\frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x-\mu)^2}{2\sigma^2}\right),\quad x>0`],cdf:[String.raw`F(x)=\Phi\!\left(\frac{\ln x-\mu}{\sigma}\right),\quad x>0`]},chisquare:{pdf:[String.raw`f(x)=\frac{x^{\nu/2-1}e^{-x/2}}{2^{\nu/2}\Gamma(\nu/2)},\quad x>0`],cdf:[String.raw`F(x)=\frac{\gamma(\nu/2,x/2)}{\Gamma(\nu/2)},\quad x>0`]},t:{pdf:[String.raw`f(x)=\frac{\Gamma\!\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\!\left(\frac{\nu}{2}\right)}\left(1+\frac{x^2}{\nu}\right)^{-\frac{\nu+1}{2}},\quad x\in\mathbb{R}`],cdf:[String.raw`F(x)=\int_{-\infty}^{x}\frac{\Gamma\!\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\!\left(\frac{\nu}{2}\right)}\left(1+\frac{t^2}{\nu}\right)^{-\frac{\nu+1}{2}}\,dt`]},f:{pdf:[String.raw`f(x)=\frac{1}{B\!\left(\frac{d_1}{2},\frac{d_2}{2}\right)}\left(\frac{d_1}{d_2}\right)^{d_1/2}x^{d_1/2-1}\left(1+\frac{d_1x}{d_2}\right)^{-\frac{d_1+d_2}{2}},\quad x>0`],cdf:[String.raw`F(x)=I_{\frac{d_1x}{d_1x+d_2}}\!\left(\frac{d_1}{2},\frac{d_2}{2}\right),\quad x>0`]},multinomial:{scatter3d:[String.raw`P(X_1=x_1,X_2=x_2,X_3=x_3)=\frac{n!}{x_1!x_2!x_3!}p_1^{x_1}p_2^{x_2}p_3^{x_3}`,String.raw`x_1+x_2+x_3=n,\quad x_1,x_2,x_3\in\mathbb{Z}_{\ge 0},\quad p_3=1-p_1-p_2`],heatmap:[String.raw`P(X_1=x_1,X_2=x_2,X_3=x_3)=\frac{n!}{x_1!x_2!x_3!}p_1^{x_1}p_2^{x_2}p_3^{x_3}`,String.raw`x_1+x_2+x_3=n,\quad x_1,x_2,x_3\in\mathbb{Z}_{\ge 0},\quad p_3=1-p_1-p_2`]},"bivariate-normal":{surface:[String.raw`f(x,y)=\frac{1}{2\pi\sigma_x\sigma_y\sqrt{1-\rho^2}}\exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_x}{\sigma_x}\right)^2-2\rho\left(\frac{x-\mu_x}{\sigma_x}\right)\left(\frac{y-\mu_y}{\sigma_y}\right)+\left(\frac{y-\mu_y}{\sigma_y}\right)^2\right]\right)`],contour:[String.raw`f(x,y)=\frac{1}{2\pi\sigma_x\sigma_y\sqrt{1-\rho^2}}\exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_x}{\sigma_x}\right)^2-2\rho\left(\frac{x-\mu_x}{\sigma_x}\right)\left(\frac{y-\mu_y}{\sigma_y}\right)+\left(\frac{y-\mu_y}{\sigma_y}\right)^2\right]\right)`]},"bivariate-uniform":{surface:[String.raw`f(x,y)=\begin{cases}\dfrac{1}{(b-a)(d-c)}, & a\le x\le b,\ c\le y\le d\\0, & \text{otherwise}\end{cases}`],contour:[String.raw`f(x,y)=\begin{cases}\dfrac{1}{(b-a)(d-c)}, & a\le x\le b,\ c\le y\le d\\0, & \text{otherwise}\end{cases}`]}},f=`
  const LATEX_FORMULAS = ${JSON.stringify(d)};

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
`,p=String.raw`
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
`,m=`
    els.formulaBlock.render({
      label: formulaLabel(view),
      latexLines: getLatexFormulaLines(dist, view),
      rawFormula: dist.formula(view, params),
      note: formulaNoteText(dist, view),
    });`,h=`
      applyNormalVisualLock(spec, dist, view);
      spec.layout.uirevision = dist.id + "-" + view;
      Plotly.react(els.plot, spec.data, spec.layout, spec.config);`;function g(e){let t=e;t=t.replace(`<pre id="formulaBox" class="formula-box"></pre>`,`<div id="formulaBox" class="formula-box"></div>`),t=t.replace(`.formula-box {`,`.formula-box {
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

.formula-box {`),t=t.replace(`range(params) { return [params.mu - 4.5 * params.sigma, params.mu + 4.5 * params.sigma]; },`,`range() { return [-8, 8]; },`),t=t.replace(`    formulaLabel: document.getElementById('formulaLabel'),
    formulaBox: document.getElementById('formulaBox'),
    formulaNote: document.getElementById('formulaNote'),`,`    formulaLabel: document.getElementById('formulaLabel'),
    formulaBox: document.getElementById('formulaBox'),
    formulaNote: document.getElementById('formulaNote'),
    formulaBlock: null,`),t=t.replace(`  function formulaLabel(view) {`,`${f}\n\n${p}\n\n  function formulaLabel(view) {`),t=t.replace(`  function renderInfoOnly() {`,`  els.formulaBlock = createFormulaBlockRenderer({
    labelEl: els.formulaLabel,
    boxEl: els.formulaBox,
    noteEl: els.formulaNote,
  });

  function renderInfoOnly() {`),t=t.replace(`  els.searchInput.addEventListener('input', function (e) {`,`  if (els.searchInput) els.searchInput.addEventListener('input', function (e) {`),t=t.replace(`  els.searchInput.addEventListener('keydown', function (e) {`,`  if (els.searchInput) els.searchInput.addEventListener('keydown', function (e) {`),t=t.replace(`  els.clearSearchBtn.addEventListener('click', function () {`,`  if (els.clearSearchBtn) els.clearSearchBtn.addEventListener('click', function () {`),t=t.replace(`  els.resetParamsBtn.addEventListener('click', function () {`,`  if (els.resetParamsBtn) els.resetParamsBtn.addEventListener('click', function () {`),t=t.replace(`    els.formulaLabel.textContent = formulaLabel(view);
    els.formulaBox.textContent = dist.formula(view, params);
    els.formulaNote.textContent = formulaNoteText(dist, view);`,m),t=t.replace(`      spec.layout.uirevision = dist.id + '-' + view;
      Plotly.react(els.plot, spec.data, spec.layout, spec.config);`,h),t=t.replace(`  renderSidebar();
  renderSelection();`,`  function rerenderFormulaWhenKatexReady() {
    if (window.katex && window.katex.renderToString) {
      renderInfoOnly();
      return;
    }
    const katexScript = document.querySelector('script[data-prob-katex="1"]');
    if (!katexScript) {
      return;
    }
    katexScript.addEventListener("load", function () {
      renderInfoOnly();
    }, { once: true });
  }

  renderSidebar();
  renderSelection();
  rerenderFormulaWhenKatexReady();`);let n=`  <link rel="stylesheet" href="${l}" />\n`,r=`  <script defer data-prob-katex="1" src="${u}"><\/script>
`;return t=t.replace(`</head>`,`${n}${r}</head>`),t}var _={class:`probability-gallery-page`},v=[`srcdoc`],y={key:0,class:`gallery-loading`},b={key:1,class:`gallery-error`},x=o({__name:`ProbabilityDistributionGallery`,setup(o){let l=e(!1),u=e(``),d=e(``);t(async()=>{try{let e=await fetch(c);if(!e.ok)throw Error(`HTTP ${e.status}`);let t=await e.text();d.value=g(t)}catch(e){console.error(`[ProbabilityDistributionGallery] 加载资源失败`,e),u.value=`概率论学习工具内容缺失，请检查资源文件后重试。`}});function f(){if(d.value){l.value=!0;try{u.value=``}catch(e){console.error(`[ProbabilityDistributionGallery] 初始化失败`,e),u.value=`概率论学习工具加载失败，请刷新页面后重试，或稍后再访问。`}}}return(e,t)=>(a(),s(`section`,_,[i(`iframe`,{class:`gallery-frame`,srcdoc:d.value,title:`概率论与数理统计函数图像库`,loading:`lazy`,referrerpolicy:`no-referrer`,onLoad:f},null,40,v),l.value?r(``,!0):(a(),s(`p`,y,`图像工具加载中...`)),u.value?(a(),s(`p`,b,n(u.value),1)):r(``,!0)]))}},[[`__scopeId`,`data-v-59f11ca1`]]);export{x as default};