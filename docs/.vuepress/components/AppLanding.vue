<template>
  <section class="app-landing">
    <h1>启梦华工 App</h1>
    <p class="lead">
      启梦华工是手册配套应用，帮助你在手机端更快找到常用信息。你可以根据设备选择下载渠道，后续版本将持续补齐更多平台支持。
    </p>

    <div class="hero-actions">
      <button
        class="btn btn-secondary btn-recommend"
        @click="handlePlatformAction(recommendedPlatform)"
      >
        {{ recommendedButtonText }}
      </button>
      <span class="version" v-if="latestVersion"
        >当前版本：{{ latestVersion }}</span
      >
    </div>

    <div class="grid">
      <button
        class="btn btn-secondary"
        @click="handlePlatformAction('android')"
      >
        Android 下载
      </button>
      <button class="btn btn-secondary" @click="handlePlatformAction('ios')">
        iOS 下载
      </button>
      <button
        class="btn btn-secondary"
        @click="handlePlatformAction('harmony')"
      >
        HarmonyOS 下载
      </button>
      <button class="btn btn-secondary" @click="handlePlatformAction('pwa')">
        PWA 体验
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const releaseData = ref(null);
const recommendedPlatform = ref("android");

const PLATFORM_TEXT = {
  android: "Android",
  ios: "iOS",
  harmony: "HarmonyOS",
  pwa: "PWA",
};

const latestVersion = computed(() => releaseData.value?.latest?.version || "");
const apkUrl = computed(() => releaseData.value?.latest?.assets?.apk || "");

const recommendedButtonText = computed(() => {
  const platformText = PLATFORM_TEXT[recommendedPlatform.value] || "Android";
  return `推荐下载：${platformText}`;
});

onMounted(async () => {
  recommendedPlatform.value = detectRecommendedPlatform();
  releaseData.value = await fetchReleaseData();
});

function detectRecommendedPlatform() {
  const ua = (navigator.userAgent || "").toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();

  if (ua.includes("harmony") || ua.includes("openharmony")) {
    return "harmony";
  }
  if (ua.includes("android")) {
    return "android";
  }
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return "ios";
  }

  const isMac = platform.includes("mac") || ua.includes("mac os x");
  const isWindows = platform.includes("win") || ua.includes("windows");
  if (isMac) {
    return "ios";
  }
  if (isWindows) {
    return "android";
  }
  return "android";
}

async function fetchReleaseData() {
  try {
    const response = await fetch("/assets/app/release.json", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("[AppLanding] 获取版本信息失败", err);
    return null;
  }
}

function handlePlatformAction(platform) {
  if (platform === "android") {
    if (apkUrl.value) {
      window.location.href = apkUrl.value;
      return;
    }
    window.alert("Coming soon");
    return;
  }

  window.alert("Coming soon");
}
</script>

<style scoped>
.app-landing {
  padding: 1.5rem;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  background: linear-gradient(
    160deg,
    var(--vp-c-bg-soft) 0%,
    var(--vp-c-bg-mute) 100%
  );
}

.lead {
  margin-top: 0.75rem;
  color: var(--vp-c-text-1);
  line-height: 1.75;
}

.hero-actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.btn-recommend {
  width: min(100%, 36rem);
}

.version {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.grid {
  margin-top: 1.1rem;
  margin-inline: auto;
  width: min(100%, 36rem);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.btn {
  border: 0;
  border-radius: 10px;
  padding: 0.68rem 0.9rem;
  cursor: pointer;
  font-weight: 600;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.btn-secondary {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
