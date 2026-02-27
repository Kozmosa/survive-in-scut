import fs from "node:fs";
import path from "node:path";

const LINK_PROVIDERS = {
  none: (url) => url,
  fastgit: (url) => {
    if (url.startsWith("https://fastgit.cc/")) {
      return url;
    }
    return `https://fastgit.cc/${url}`;
  },
};

const APK_SOURCES = {
  MY_SCUT_PRJ: "MySCUTPrj",
  MANUAL_PRJ: "ManualPrj",
};

export default (options = {}) => {
  const {
    apkSource = APK_SOURCES.MY_SCUT_PRJ,
    manualApkUrl = "/root-assets/qmm-latest.apk",
    sourceUrl = "https://raw.githubusercontent.com/Kozmosa/survive-in-scut/refs/heads/main/versions.json",
    provider = "fastgit",
    outputDir = ".vuepress/public/assets/app",
    outputFile = "release.json",
  } = options;

  return {
    name: "app-release-metadata",

    async onPrepared(app) {
      const sourceDir = app.dir.source();
      const outputDirPath = path.resolve(sourceDir, outputDir);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      const outputPath = path.resolve(outputDirPath, outputFile);
      const providerFn = LINK_PROVIDERS[provider] || LINK_PROVIDERS.none;
      const sourceFetchUrl = transformGithubUrl(sourceUrl, providerFn);
      const resolvedApkSource = Object.values(APK_SOURCES).includes(apkSource)
        ? apkSource
        : APK_SOURCES.MY_SCUT_PRJ;

      if (resolvedApkSource === APK_SOURCES.MANUAL_PRJ) {
        const manualPayload = {
          generatedAt: new Date().toISOString(),
          apkSource: resolvedApkSource,
          sourceUrl,
          sourceFetchUrl,
          provider,
          latest: {
            assets: {
              apk: manualApkUrl,
            },
          },
          versions: {},
        };
        fs.writeFileSync(
          outputPath,
          JSON.stringify(manualPayload, null, 2),
          "utf-8",
        );
        console.log(`[App Release] 使用 ManualPrj APK 链接: ${manualApkUrl}`);
        return;
      }

      try {
        const upstream = await fetchReleaseJson(sourceFetchUrl, sourceUrl);
        const transformed = transformReleaseData(upstream, providerFn);

        const payload = {
          generatedAt: new Date().toISOString(),
          apkSource: resolvedApkSource,
          sourceUrl,
          sourceFetchUrl,
          provider,
          latest: transformed.latest,
          versions: transformed.versions,
        };

        fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), "utf-8");
        console.log(`[App Release] 生成下载元数据到: ${outputPath}`);
      } catch (err) {
        console.error(`[App Release] 拉取或转换版本数据失败: ${err.message}`);
        const fallbackPayload = {
          generatedAt: new Date().toISOString(),
          apkSource: resolvedApkSource,
          sourceUrl,
          sourceFetchUrl,
          provider,
          latest: null,
          versions: {},
        };
        fs.writeFileSync(
          outputPath,
          JSON.stringify(fallbackPayload, null, 2),
          "utf-8",
        );
      }
    },
  };
};

function transformReleaseData(input, providerFn) {
  const latest = transformVersionNode(input?.latest, providerFn);
  const versions = {};

  const rawVersions = input?.versions;
  if (rawVersions && typeof rawVersions === "object") {
    for (const [versionKey, versionNode] of Object.entries(rawVersions)) {
      versions[versionKey] = transformVersionNode(versionNode, providerFn);
    }
  }

  return { latest, versions };
}

function transformVersionNode(versionNode, providerFn) {
  if (!versionNode || typeof versionNode !== "object") {
    return null;
  }

  const transformed = {
    ...versionNode,
  };

  if (versionNode.assets && typeof versionNode.assets === "object") {
    transformed.assets = {};
    for (const [assetKey, assetUrl] of Object.entries(versionNode.assets)) {
      transformed.assets[assetKey] = transformGithubUrl(assetUrl, providerFn);
    }
  }

  return transformed;
}

function transformGithubUrl(url, providerFn) {
  if (typeof url !== "string") {
    return url;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const isGithubHost =
      host === "github.com" || host === "raw.githubusercontent.com";
    if (!isGithubHost) {
      return url;
    }
    return providerFn(url);
  } catch {
    return url;
  }
}

async function fetchReleaseJson(primaryUrl, fallbackUrl) {
  const urls = [primaryUrl];
  if (fallbackUrl !== primaryUrl) {
    urls.push(fallbackUrl);
  }

  let lastError = null;
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "survive-in-scut-app-release-plugin",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Unknown fetch error");
}
