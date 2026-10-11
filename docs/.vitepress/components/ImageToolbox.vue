<template>
  <div class="wrap">
    <header>
      <h1>图片小工具<span class="dot">.</span></h1>
      <p class="sub">
        压缩到指定大小 · 两图拼接 —— 全部在浏览器本地完成，图片不会上传
      </p>
    </header>

    <nav class="tabs" role="tablist">
      <button
        id="tabCompress"
        :class="{ active: currentTab === 'compress' }"
        type="button"
        @click="switchTab('compress')"
      >
        📦 图片压缩
      </button>
      <button
        id="tabMerge"
        :class="{ active: currentTab === 'merge' }"
        type="button"
        @click="switchTab('merge')"
      >
        🧩 图片拼接
      </button>
    </nav>

    <!-- ============ 压缩 ============ -->
    <section
      id="panelCompress"
      class="card"
      :hidden="currentTab !== 'compress'"
    >
      <div class="controls">
        <label class="field"
          >目标大小
          <input
            type="number"
            id="cTarget"
            value="500"
            min="10"
            max="10240"
            step="10"
          />
          KB
        </label>
        <label class="field"
          >输出格式
          <select id="cFmt">
            <option value="jpg">JPG（兼容性最好）</option>
            <option value="webp">WebP（同等大小更清晰）</option>
          </select>
        </label>
      </div>

      <div class="dropzone" id="cDrop">
        <div class="big">点击选择图片，或拖拽到这里</div>
        支持 Ctrl+V 粘贴截图 · 可多选批量处理<br />
        压缩结果自动命名为「原名_压缩.jpg」
        <input
          type="file"
          id="cFiles"
          accept="image/*"
          multiple
          hidden
          @change="handleCompressionFiles"
        />
      </div>

      <ul class="file-list" id="cList">
        <li
          v-for="item in compressionItems"
          :key="item.id"
          class="file-item"
          :class="{ error: item.status === 'error' }"
        >
          <img class="thumb" :src="item.previewUrl" alt="预览" />
          <div class="meta">
            <div class="name" :title="item.displayName">
              {{ item.displayName }}
            </div>
            <div class="sub">{{ item.sizeText }}</div>
            <div class="detail">
              <span v-if="item.status === 'busy'" class="spin"></span>
              {{ item.detail }}
            </div>
          </div>
          <div class="side">
            <span v-if="item.badge" class="badge" :class="item.badgeClass">
              {{ item.badge }}
            </span>
            <button
              v-if="item.status === 'done'"
              class="btn primary small"
              type="button"
              @click="downloadItem(item)"
            >
              下载
            </button>
            <button
              class="icon-btn"
              type="button"
              title="移除"
              @click="removeItem(item)"
            >
              ×
            </button>
          </div>
        </li>
      </ul>

      <div class="panel-actions" id="cActions" :hidden="!hasCompressionItems">
        <button
          class="btn primary"
          id="cDlAll"
          type="button"
          :disabled="!hasCompletedCompression"
          @click="downloadAll"
        >
          ⬇ 全部下载
        </button>
        <button
          class="btn ghost"
          id="cRedo"
          type="button"
          @click="redoCompression"
        >
          ↻ 按当前设置重新压缩
        </button>
      </div>

      <p class="hint">
        原理：在原始分辨率下用二分法寻找能压进目标的最高 JPG/WebP
        质量；如果最低画质仍超标，才逐步缩小尺寸，尽量保留清晰度。若原图已经小于目标，则不重新编码，直接改名下载。
      </p>
    </section>

    <!-- ============ 拼接 ============ -->
    <section id="panelMerge" class="card" :hidden="currentTab !== 'merge'">
      <div class="slots">
        <div class="slot" id="slotA">
          <div class="slot-title">图 1（横向在左 · 纵向在上）</div>
          <div class="slot-body" id="bodyA">
            <div>点击选择或拖入图片</div>
          </div>
          <input
            type="file"
            id="fileA"
            accept="image/*"
            hidden
            @change="handleSlotAFiles"
          />
        </div>
        <div class="swap-col">
          <button
            class="btn ghost"
            id="mSwap"
            type="button"
            title="交换两张图"
            @click="swapMergeImages"
          >
            ⇄
          </button>
        </div>
        <div class="slot" id="slotB">
          <div class="slot-title">图 2（横向在右 · 纵向在下）</div>
          <div class="slot-body" id="bodyB">
            <div>点击选择或拖入图片</div>
          </div>
          <input
            type="file"
            id="fileB"
            accept="image/*"
            hidden
            @change="handleSlotBFiles"
          />
        </div>
      </div>

      <div class="controls">
        <div class="field">
          方向：
          <label
            ><input type="radio" name="dir" value="h" checked /> 横向并排</label
          >
          <label><input type="radio" name="dir" value="v" /> 纵向上下</label>
        </div>
        <label class="field"
          >尺寸
          <select id="mSize" @change="updateMergeAlignment">
            <option value="fit">统一高度/宽度（不放大）</option>
            <option value="orig">保持原始尺寸</option>
          </select>
        </label>
        <label class="field"
          >对齐
          <select id="mAlign" :disabled="mergeAlignDisabled">
            <option value="start">起始</option>
            <option value="center" selected>居中</option>
            <option value="end">末端</option>
          </select>
        </label>
        <label class="field"
          >间距
          <input
            type="number"
            id="mGap"
            value="0"
            min="0"
            max="2000"
            step="1"
          />
          px
        </label>
        <label class="field"
          >背景
          <input type="color" id="mBg" value="#ffffff" />
        </label>
        <label class="field"
          >格式
          <select id="mFmt">
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
          </select>
        </label>
      </div>

      <button
        class="btn primary"
        id="mRun"
        type="button"
        :disabled="!mergeReady || mergeBusy"
        @click="runMerge"
      >
        {{ mergeBusy ? "拼接中…" : "🧩 开始拼接" }}
      </button>

      <div class="result" id="mResultBox" v-if="mergeResult">
        <img :src="mergeResult.url" alt="拼接结果预览" />
        <div class="res-line">
          <div class="res-text" id="mResText">
            <b>{{ mergeResult.name }}</b> · {{ mergeResult.meta }}
          </div>
          <button
            class="btn primary small"
            id="mResDl"
            type="button"
            @click="downloadMergeResult"
          >
            ⬇ 下载
          </button>
        </div>
      </div>

      <p class="hint">
        结果自动命名为「图1名_图2名.jpg」。「统一高度/宽度」会把两图等比缩放到相同的高（或宽），以较小的一边为准、不会放大；「保持原始尺寸」按原大小摆放，短的一侧按「对齐」方式留白（间距与留白处填充背景色）。
      </p>
    </section>

    <footer>
      🔒 所有处理均在本机浏览器内完成，无网络请求，图片不会上传到任何服务器。
    </footer>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";

const currentTab = ref("compress");
const compressionItems = ref([]);
const hasCompressionItems = ref(false);
const hasCompletedCompression = ref(false);
const mergeReady = ref(false);
const mergeBusy = ref(false);
const mergeAlignDisabled = ref(true);
const mergeResult = ref(null);
let downloadAll = () => {};
let downloadItem = () => {};
let removeItem = () => {};
let redoCompression = () => {};
let swapMergeImages = () => {};
let runMerge = async () => {};
let downloadMergeResult = () => {};
let handleCompressionFiles = () => {};
let handleSlotAFiles = () => {};
let handleSlotBFiles = () => {};
let updateMergeAlignment = () => {};

function switchTab(tab) {
  currentTab.value = tab;
}

onMounted(() => {
  /* ================= 通用工具 ================= */
  const $ = (s, el) => (el || document).querySelector(s);
  const fmtSize = (n) => {
    if (!Number.isFinite(n)) return "—";
    if (n >= 1048576) return (n / 1048576).toFixed(2) + " MB";
    if (n >= 1024) return (n / 1024).toFixed(1) + " KB";
    return n + " B";
  };
  const stemOf = (name) => {
    const i = name.lastIndexOf(".");
    return i > 0 ? name.slice(0, i) : name;
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  /* 解码图片：优先 createImageBitmap（自动处理 EXIF 方向），失败退回 <img> */
  async function loadSrc(file) {
    try {
      const bm = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });
      return { src: bm, w: bm.width, h: bm.height };
    } catch (_) {
      /* 尝试下一种方式 */
    }
    try {
      const bm = await createImageBitmap(file);
      return { src: bm, w: bm.width, h: bm.height };
    } catch (_) {
      /* 继续退回 <img> */
    }
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => {
        const im = new Image();
        im.onload = () => res(im);
        im.onerror = () =>
          rej(new Error("浏览器无法解码该图片（可能是不支持的格式，如 HEIC）"));
        im.src = url;
      });
      return {
        src: img,
        w: img.naturalWidth || img.width,
        h: img.naturalHeight || img.height,
      };
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
  }

  function makeCanvas(w, h, bg) {
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w));
    c.height = Math.max(1, Math.round(h));
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (bg) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, c.width, c.height);
    }
    return { c, ctx };
  }
  const toBlob = (canvas, mime, q) =>
    new Promise((res, rej) => {
      canvas.toBlob(
        (b) => (b ? res(b) : rej(new Error("图片编码失败，请重试"))),
        mime,
        q,
      );
    });

  let _webpOK = null;
  async function supportsWebp() {
    if (_webpOK === null) {
      try {
        const { c } = makeCanvas(4, 4);
        const b = await new Promise((r) => c.toBlob(r, "image/webp", 0.8));
        _webpOK = !!(b && b.type === "image/webp");
      } catch (_) {
        _webpOK = false;
      }
    }
    return _webpOK;
  }

  function wireDropzone(el, onFiles) {
    el.addEventListener("click", () => {
      const inp = $("input[type=file]", el);
      if (inp) inp.click();
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      el.classList.add("drag");
    });
    el.addEventListener("dragleave", () => el.classList.remove("drag"));
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.remove("drag");
      const fs = [...((e.dataTransfer && e.dataTransfer.files) || [])].filter(
        (f) => f.type.startsWith("image/"),
      );
      if (fs.length) onFiles(fs);
    });
  }

  /* ================= 功能一：压缩 ================= */
  let nextItemId = 0;

  function getTargetBytes() {
    const v = parseInt($("#cTarget").value, 10);
    return Math.max(10, Math.min(10240, isNaN(v) ? 500 : v)) * 1024;
  }

  /* 二分法：找出 ≤ target 的最高质量。返回 {ok, blob, q}；ok=false 时 blob 为最小结果 */
  async function bestUnderTarget(canvas, mime, target, onStep) {
    const hi = 0.96,
      lo = 0.03;
    let smallest = null,
      smallestQ = hi;
    const track = (blob, q) => {
      if (!smallest || blob.size < smallest.size) {
        smallest = blob;
        smallestQ = q;
      }
    };
    onStep && onStep(hi);
    const top = await toBlob(canvas, mime, hi);
    track(top, hi);
    if (top.size <= target) return { ok: true, blob: top, q: hi };
    let a = lo,
      b = hi,
      best = null;
    for (let i = 0; i < 9 && b - a > 0.02; i++) {
      const q = (a + b) / 2;
      onStep && onStep(q);
      const blob = await toBlob(canvas, mime, q);
      track(blob, q);
      if (blob.size <= target) {
        best = { blob, q };
        a = q;
      } else {
        b = q;
      }
    }
    return best
      ? { ok: true, blob: best.blob, q: best.q }
      : { ok: false, blob: smallest, q: smallestQ };
  }

  function addItem(file) {
    const originalUrl = URL.createObjectURL(file);
    const item = {
      id: ++nextItemId,
      file,
      status: "idle",
      info: null,
      previewUrl: originalUrl,
      originalUrl,
      displayName: file.name,
      sizeText: fmtSize(file.size),
      detail: "排队中…",
      badge: "",
      badgeClass: "",
    };
    const setThumb = (blob) => {
      const u = URL.createObjectURL(blob);
      if (item.previewUrl !== item.originalUrl)
        URL.revokeObjectURL(item.previewUrl);
      item.previewUrl = u;
    };
    item.setBusy = (text) => {
      item.status = "busy";
      item.badge = "";
      item.badgeClass = "";
      item.detail = text;
    };
    item.fail = (msg) => {
      item.status = "error";
      item.info = null;
      item.badge = "";
      item.badgeClass = "";
      item.detail = msg;
      refreshActions();
    };
    item.done = (info) => {
      item.status = "done";
      item.info = info;
      setThumb(info.blob);
      item.displayName = info.name;
      item.sizeText = fmtSize(file.size) + "  →  " + fmtSize(info.blob.size);
      const parts = [];
      if (info.passthrough) {
        parts.push("原图已小于目标，未重新编码");
      } else {
        parts.push("质量 " + Math.round(info.quality * 100) + "%");
        parts.push(info.dims[0] + "×" + info.dims[1] + "px");
        if (info.scaled)
          parts.push(
            "由 " + info.origDims[0] + "×" + info.origDims[1] + " 缩小",
          );
        if (info.note) parts.push(info.note);
      }
      item.detail = parts.join(" · ");
      if (info.warn) {
        item.badge = "未达标";
        item.badgeClass = "warn";
        item.detail += "；" + info.warn;
      } else {
        const pct = Math.max(
          1,
          Math.round((1 - info.blob.size / file.size) * 100),
        );
        item.badge = info.passthrough ? "已达标" : "−" + pct + "%";
        item.badgeClass = "ok";
      }
      refreshActions();
    };
    compressionItems.value.push(item);
    refreshActions();
    enqueue(() => processItem(item));
  }

  async function processItem(item) {
    const target = getTargetBytes();
    const wantWebp = $("#cFmt").value === "webp" && (await supportsWebp());
    const mime = wantWebp ? "image/webp" : "image/jpeg";
    const outExt = wantWebp ? ".webp" : ".jpg";
    const note =
      $("#cFmt").value === "webp" && !wantWebp
        ? "浏览器不支持 WebP，已改用 JPG"
        : "";

    item.setBusy("解码中…");
    let s;
    try {
      s = await loadSrc(item.file);
    } catch (err) {
      item.fail(err.message || String(err));
      return;
    }

    /* 原图已达标：不重新编码，直接改名 */
    if (item.file.size <= target) {
      const m = item.file.name.match(/\.[^.]+$/);
      item.done({
        blob: item.file,
        name: stemOf(item.file.name) + "_压缩" + (m ? m[0] : ""),
        passthrough: true,
        dims: [s.w, s.h],
      });
      return;
    }

    let scale = 1;
    const MAX_SIDE = 12000;
    if (Math.max(s.w, s.h) > MAX_SIDE) scale = MAX_SIDE / Math.max(s.w, s.h);

    let result = null,
      fallback = null,
      usedScale = scale;
    for (let round = 0; round < 8; round++) {
      const { c, ctx } = makeCanvas(
        s.w * usedScale,
        s.h * usedScale,
        mime === "image/jpeg" ? "#ffffff" : null,
      );
      ctx.drawImage(s.src, 0, 0, c.width, c.height);
      let r;
      try {
        r = await bestUnderTarget(c, mime, target, (q) => {
          item.setBusy(
            "压缩中 · 试质量 " +
              Math.round(q * 100) +
              "%" +
              (round
                ? "（已缩小到 " + Math.round(usedScale * 100) + "%）"
                : ""),
          );
        });
      } catch (err) {
        item.fail(err.message || String(err));
        return;
      }
      if (r.ok) {
        result = { ...r, scale: usedScale };
        break;
      }
      if (!fallback || r.blob.size < fallback.blob.size)
        fallback = { ...r, scale: usedScale };
      /* 最低质量仍超标：按 面积∝体积 估算更小的缩放，至少缩 10% */
      const next = Math.max(
        0.02,
        usedScale * Math.sqrt(target / r.blob.size) * 0.95,
      );
      usedScale = Math.min(next, usedScale * 0.9);
    }

    if (!result)
      result = { ...fallback, warn: "已尽力压缩，仍未能压进目标大小" };
    item.done({
      blob: result.blob,
      name: stemOf(item.file.name) + "_压缩" + outExt,
      quality: result.q,
      scaled: result.scale < 0.999,
      dims: [Math.round(s.w * result.scale), Math.round(s.h * result.scale)],
      origDims: [s.w, s.h],
      note,
    });
  }

  /* 串行队列，避免多张图同时占满内存 */
  let chain = Promise.resolve();
  function enqueue(fn) {
    chain = chain.then(fn).catch(() => {});
  }

  function refreshActions() {
    const any = compressionItems.value.length > 0;
    const anyDone = compressionItems.value.some((it) => it.status === "done");
    hasCompressionItems.value = any;
    hasCompletedCompression.value = anyDone;
  }
  downloadItem = (item) => {
    if (item.info) downloadBlob(item.info.blob, item.info.name);
  };
  removeItem = (item) => {
    if (item.previewUrl !== item.originalUrl)
      URL.revokeObjectURL(item.previewUrl);
    URL.revokeObjectURL(item.originalUrl);
    const index = compressionItems.value.indexOf(item);
    if (index >= 0) compressionItems.value.splice(index, 1);
    refreshActions();
  };
  downloadAll = async () => {
    for (const it of compressionItems.value) {
      if (it.status === "done" && it.info) {
        downloadBlob(it.info.blob, it.info.name);
        await sleep(400);
      }
    }
  };
  redoCompression = () => {
    for (const it of compressionItems.value) enqueue(() => processItem(it));
  };

  wireDropzone($("#cDrop"), (files) => files.forEach(addItem));
  handleCompressionFiles = (e) => {
    [...e.target.files].forEach(addItem);
    e.target.value = "";
  };
  window.addEventListener("paste", (e) => {
    if (currentTab.value !== "compress") return;
    const files = [
      ...((e.clipboardData && e.clipboardData.files) || []),
    ].filter((f) => f.type.startsWith("image/"));
    if (files.length) {
      e.preventDefault();
      files.forEach(addItem);
    }
  });

  /* ================= 功能二：拼接 ================= */
  const mState = { a: null, b: null }; // {file, src, w, h, url}
  let mResUrl = null,
    mResBlob = null,
    mResName = "";

  function slotEls(k) {
    return {
      slot: $("#slot" + k.toUpperCase()),
      body: $("#body" + k.toUpperCase()),
      input: $("#file" + k.toUpperCase()),
    };
  }
  function renderSlot(k) {
    const { slot, body } = slotEls(k);
    const st = mState[k];
    slot.classList.toggle("filled", !!st);
    if (!st) {
      body.innerHTML = "<div>点击选择或拖入图片</div>";
      return;
    }
    body.innerHTML =
      '<img class="preview" alt="预览">' +
      '<div class="slot-name"></div>' +
      '<div class="slot-meta"></div>';
    $(".preview", body).src = st.url;
    $(".slot-name", body).textContent = st.file.name;
    $(".slot-name", body).title = st.file.name;
    $(".slot-meta", body).textContent =
      st.w + "×" + st.h + " · " + fmtSize(st.file.size);
  }
  async function setSlot(k, file) {
    const old = mState[k];
    if (old) URL.revokeObjectURL(old.url);
    mState[k] = null;
    renderSlot(k);
    updateMergeReady();
    const url = URL.createObjectURL(file);
    let s;
    try {
      s = await loadSrc(file);
    } catch (err) {
      URL.revokeObjectURL(url);
      const { body } = slotEls(k);
      body.innerHTML = '<div class="slot-error"></div>';
      $(".slot-error", body).textContent = err.message || "无法解码该图片";
      return;
    }
    mState[k] = { file, src: s.src, w: s.w, h: s.h, url };
    renderSlot(k);
    updateMergeReady();
  }
  function updateMergeReady() {
    mergeReady.value = !!(mState.a && mState.b);
  }

  ["a", "b"].forEach((k) => {
    const { slot, input } = slotEls(k);
    wireDropzone(slot, (files) => setSlot(k, files[0]));
    const handleSlotFile = (e) => {
      if (e.target.files && e.target.files[0]) setSlot(k, e.target.files[0]);
      e.target.value = "";
    };
    if (k === "a") handleSlotAFiles = handleSlotFile;
    else handleSlotBFiles = handleSlotFile;
  });
  swapMergeImages = () => {
    const t = mState.a;
    mState.a = mState.b;
    mState.b = t;
    renderSlot("a");
    renderSlot("b");
  };

  /* 对齐偏移 */
  const alignPos = (total, part, align) =>
    align === "start"
      ? 0
      : align === "end"
        ? total - part
        : Math.round((total - part) / 2);

  function computeLayout(A, B, opt) {
    const g = opt.gap;
    let w, h, draws;
    if (opt.horiz) {
      if (opt.fit) {
        const hh = Math.min(A.h, B.h);
        const aw = Math.round((A.w * hh) / A.h),
          bw = Math.round((B.w * hh) / B.h);
        w = aw + g + bw;
        h = hh;
        draws = [
          { img: A.src, x: 0, y: 0, w: aw, h: hh },
          { img: B.src, x: aw + g, y: 0, w: bw, h: hh },
        ];
      } else {
        w = A.w + g + B.w;
        h = Math.max(A.h, B.h);
        draws = [
          {
            img: A.src,
            x: 0,
            y: alignPos(h, A.h, opt.align),
            w: A.w,
            h: A.h,
          },
          {
            img: B.src,
            x: A.w + g,
            y: alignPos(h, B.h, opt.align),
            w: B.w,
            h: B.h,
          },
        ];
      }
    } else {
      if (opt.fit) {
        const ww = Math.min(A.w, B.w);
        const ah = Math.round((A.h * ww) / A.w),
          bh = Math.round((B.h * ww) / B.w);
        w = ww;
        h = ah + g + bh;
        draws = [
          { img: A.src, x: 0, y: 0, w: ww, h: ah },
          { img: B.src, x: 0, y: ah + g, w: ww, h: bh },
        ];
      } else {
        h = A.h + g + B.h;
        w = Math.max(A.w, B.w);
        draws = [
          {
            img: A.src,
            x: alignPos(w, A.w, opt.align),
            y: 0,
            w: A.w,
            h: A.h,
          },
          {
            img: B.src,
            x: alignPos(w, B.w, opt.align),
            y: A.h + g,
            w: B.w,
            h: B.h,
          },
        ];
      }
    }
    return { w, h, draws };
  }

  runMerge = async () => {
    const A = mState.a,
      B = mState.b;
    if (!(A && B)) return;
    mergeBusy.value = true;
    mergeResult.value = null;
    try {
      const opt = {
        horiz: $("input[name=dir]:checked").value === "h",
        fit: $("#mSize").value === "fit",
        align: $("#mAlign").value,
        gap: Math.max(0, Math.min(2000, parseInt($("#mGap").value, 10) || 0)),
        bg: $("#mBg").value,
        fmt: $("#mFmt").value,
      };
      let lay = computeLayout(A, B, opt);

      /* 超大画布保护 */
      let shrinkNote = "";
      const MAXC = 16384,
        MAXA = 200e6;
      const f = Math.min(
        1,
        MAXC / Math.max(lay.w, lay.h),
        Math.sqrt(MAXA / (lay.w * lay.h)),
      );
      if (f < 1) {
        lay = {
          w: Math.round(lay.w * f),
          h: Math.round(lay.h * f),
          draws: lay.draws.map((d) => ({
            img: d.img,
            x: Math.round(d.x * f),
            y: Math.round(d.y * f),
            w: Math.max(1, Math.round(d.w * f)),
            h: Math.max(1, Math.round(d.h * f)),
          })),
        };
        shrinkNote = "（总尺寸过大，已等比缩小）";
      }

      const { c, ctx } = makeCanvas(lay.w, lay.h, opt.bg);
      for (const d of lay.draws) ctx.drawImage(d.img, d.x, d.y, d.w, d.h);
      const blob = await toBlob(c, opt.fmt, 0.92);
      mResBlob = blob;
      mResName =
        stemOf(A.file.name) +
        "_" +
        stemOf(B.file.name) +
        (opt.fmt === "image/png" ? ".png" : ".jpg");

      if (mResUrl) URL.revokeObjectURL(mResUrl);
      mResUrl = URL.createObjectURL(blob);
      mergeResult.value = {
        url: mResUrl,
        name: mResName,
        meta: lay.w + "×" + lay.h + "px · " + fmtSize(blob.size) + shrinkNote,
      };
    } catch (err) {
      alert("拼接失败：" + (err.message || err));
    } finally {
      mergeBusy.value = false;
      updateMergeReady();
    }
  };
  downloadMergeResult = () => {
    if (mResBlob) downloadBlob(mResBlob, mResName);
  };

  /* 尺寸模式为「统一」时，对齐选项不生效 */
  updateMergeAlignment = () => {
    mergeAlignDisabled.value = $("#mSize").value === "fit";
  };
  updateMergeAlignment();
});
</script>

<style scoped>
.wrap {
  --bg: var(--vp-c-bg);
  --card: var(--vp-c-bg-soft);
  --ink: var(--vp-c-text-1);
  --muted: var(--vp-c-text-2);
  --accent: var(--vp-c-brand-1);
  --accent-dark: var(--vp-c-brand-2);
  --accent-soft: var(--vp-c-brand-soft);
  --line: var(--vp-c-divider);
  --ok: var(--vp-c-green-1, #047857);
  --ok-bg: var(--vp-c-green-soft, #ecfdf5);
  --warn: var(--vp-c-yellow-1, #92400e);
  --warn-bg: var(--vp-c-yellow-soft, #fffbeb);
  --err: var(--vp-c-danger-1, #b91c1c);
  --err-bg: var(--vp-c-danger-soft, #fef2f2);
  --radius: 16px;

  max-width: 940px;
  margin: 0 auto;
  padding: 30px 20px 60px;

  font-family:
    "Segoe UI",
    system-ui,
    -apple-system,
    "PingFang SC",
    "Microsoft YaHei",
    sans-serif;
  color: var(--ink);
  min-height: 100vh;
}

.wrap * {
  box-sizing: border-box;
}

header h1 {
  font-size: 26px;
  margin: 0 0 6px;
  letter-spacing: 0.3px;
}
header h1 .dot {
  color: var(--accent);
}
header .sub {
  color: var(--muted);
  margin: 0 0 20px;
  font-size: 14px;
}
.tabs {
  display: flex;
  gap: 6px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  padding: 5px;
  border-radius: 13px;
  width: max-content;
  margin-bottom: 18px;
}
.tabs button {
  border: 0;
  background: transparent;
  padding: 9px 24px;
  border-radius: 9px;
  font-size: 15px;
  cursor: pointer;
  color: var(--muted);
  font-weight: 600;
  transition: all 0.15s;
  font-family: inherit;
}
.tabs button.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-1);
}
.card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--vp-shadow-2);
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 26px;
  align-items: center;
  margin-bottom: 16px;
}
.field {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--muted);
}
input[type="number"],
select {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 14px;
  color: var(--ink);
  background: var(--vp-c-bg);
  font-family: inherit;
  outline: none;
}
input[type="number"]:focus,
select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
input[type="color"] {
  border: 1px solid var(--line);
  border-radius: 8px;
  width: 42px;
  height: 34px;
  padding: 2px;
  background: var(--vp-c-bg);
  cursor: pointer;
}
.dropzone {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 36px 16px;
  text-align: center;
  color: var(--muted);
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
  font-size: 14px;
  line-height: 1.7;
}
.dropzone .big {
  font-size: 16px;
  color: var(--ink);
  font-weight: 600;
}
.dropzone:hover,
.dropzone.drag {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-dark);
}
.dropzone:hover .big,
.dropzone.drag .big {
  color: var(--accent-dark);
}
.hint {
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 12px;
}
.file-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.file-item {
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  background: var(--vp-c-bg);
}
.file-item.error {
  border-color: var(--vp-c-danger-1);
  background: var(--err-bg);
}
.file-item .thumb {
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 8px;
  background: var(--vp-c-bg-mute);
  flex: none;
}
.meta {
  flex: 1;
  min-width: 0;
}
.name {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sub {
  font-size: 13px;
  color: var(--muted);
  margin-top: 1px;
}
.detail {
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 3px;
  line-height: 1.5;
}
.file-item.error .detail {
  color: var(--err);
}
.side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex: none;
}
.badge {
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 999px;
  font-weight: 700;
}
.badge.ok {
  background: var(--ok-bg);
  color: var(--ok);
}
.badge.warn {
  background: var(--warn-bg);
  color: var(--warn);
}
.btn {
  border: 0;
  border-radius: 9px;
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.btn.primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.btn.primary:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.btn.ghost {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--ink);
}
.btn.ghost:hover:not(:disabled) {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.btn.small {
  padding: 6px 14px;
  font-size: 13px;
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.icon-btn {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
}
.icon-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--err);
}
.panel-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.spin {
  width: 13px;
  height: 13px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: rot 0.8s linear infinite;
  display: inline-block;
  vertical-align: -2px;
  margin-right: 6px;
}
@keyframes rot {
  to {
    transform: rotate(360deg);
  }
}
/* 拼接 */
.slots {
  display: grid;
  grid-template-columns: 1fr 44px 1fr;
  gap: 10px;
  align-items: stretch;
  margin-bottom: 18px;
}
.slot {
  border: 1.5px dashed var(--vp-c-divider);
  border-radius: 12px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted);
  cursor: pointer;
  text-align: center;
  padding: 14px;
  transition:
    border-color 0.15s,
    background 0.15s;
  font-size: 13px;
  overflow: hidden;
}
.slot:hover,
.slot.drag {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.slot.filled {
  border-style: solid;
  border-color: var(--line);
}
.slot .slot-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}
.slot img.preview {
  max-width: 100%;
  max-height: 170px;
  border-radius: 8px;
  object-fit: contain;
}
.slot .slot-name {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ink);
  font-weight: 600;
}
.slot .slot-meta {
  color: var(--muted);
}
.slot .slot-error {
  color: var(--err);
}
.swap-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.result {
  margin-top: 18px;
  border-top: 1px dashed var(--line);
  padding-top: 18px;
}
.result img {
  max-width: 100%;
  max-height: 380px;
  border-radius: 10px;
  border: 1px solid var(--line);
  display: block;
  margin-bottom: 10px;
}
.result .res-line {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.result .res-text {
  font-size: 13.5px;
  color: var(--muted);
  min-width: 0;
  word-break: break-all;
}
.result .res-text b {
  color: var(--ink);
}
footer {
  margin-top: 28px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 12.5px;
}
@media (max-width: 640px) {
  .slots {
    grid-template-columns: 1fr;
  }
  .swap-col {
    transform: rotate(90deg);
  }
  .tabs {
    width: 100%;
  }
  .tabs button {
    flex: 1;
    padding: 9px 0;
  }
}
</style>
