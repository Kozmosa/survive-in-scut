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

const DEFAULT_SOURCE_URL =
  "https://raw.githubusercontent.com/Kozmosa/survive-in-scut/refs/heads/main/docs/.vuepress/public/root-assets/versions.json";

const DEFAULT_PREFERRED_SOURCES = ["r2", "github", "manual", "legacy"];

export default (options = {}) => {
  const {
    sourceUrl = DEFAULT_SOURCE_URL,
    provider = "fastgit",
    preferredSources = DEFAULT_PREFERRED_SOURCES,
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

      try {
        const upstream = await fetchReleaseJson(sourceFetchUrl, sourceUrl);
        const transformed = transformReleaseData(upstream, {
          providerFn,
          preferredSources,
        });

        const payload = {
          generatedAt: new Date().toISOString(),
          sourceUrl,
          sourceFetchUrl,
          provider,
          preferredSources,
          latest: transformed.latest,
          versions: transformed.versions,
        };

        fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), "utf-8");
        console.log(`[App Release] 生成下载元数据到: ${outputPath}`);
      } catch (err) {
        console.error(`[App Release] 拉取或转换版本数据失败: ${err.message}`);
        const fallbackPayload = {
          generatedAt: new Date().toISOString(),
          sourceUrl,
          sourceFetchUrl,
          provider,
          preferredSources,
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

function transformReleaseData(input, context) {
  const latest = transformVersionNode(input?.latest, context);
  const versions = {};

  const rawVersions = input?.versions;
  if (rawVersions && typeof rawVersions === "object") {
    for (const [versionKey, versionNode] of Object.entries(rawVersions)) {
      versions[versionKey] = transformVersionNode(versionNode, context);
    }
  }

  return { latest, versions };
}

function transformVersionNode(versionNode, context) {
  if (!versionNode || typeof versionNode !== "object") {
    return null;
  }

  const transformed = {
    ...versionNode,
  };

  if (versionNode.assets && typeof versionNode.assets === "object") {
    const nextAssets = {};
    for (const [assetKey, assetValue] of Object.entries(versionNode.assets)) {
      if (assetKey === "apk") {
        const candidates = normalizeAssetList(assetValue).map((item) => ({
          source: item.source,
          url: transformUrlBySource(item.url, item.source, context.providerFn),
        }));

        nextAssets.apk_candidates = candidates;
        nextAssets.apk = pickPreferredUrl(candidates, context.preferredSources);
        continue;
      }

      if (typeof assetValue === "string") {
        nextAssets[assetKey] = transformGithubUrl(assetValue, context.providerFn);
        continue;
      }

      nextAssets[assetKey] = assetValue;
    }
    transformed.assets = nextAssets;
  }

  return transformed;
}

function normalizeAssetList(assetValue) {
  if (typeof assetValue === "string") {
    const url = assetValue.trim();
    return url ? [{ source: "legacy", url }] : [];
  }

  if (!Array.isArray(assetValue)) {
    return [];
  }

  const list = [];
  for (const item of assetValue) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const source = typeof item.source === "string" ? item.source.trim() : "";
    const url = typeof item.url === "string" ? item.url.trim() : "";
    if (!url) {
      continue;
    }

    list.push({
      source: source || "unknown",
      url,
    });
  }

  return list;
}

function pickPreferredUrl(candidates, preferredSources) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return "";
  }

  const priority = Array.isArray(preferredSources)
    ? preferredSources.map((item) => String(item).toLowerCase())
    : [];
  if (priority.length > 0) {
    for (const source of priority) {
      const matched = candidates.find((item) => item.source.toLowerCase() === source);
      if (matched && matched.url) {
        return matched.url;
      }
    }
  }

  return candidates[0].url || "";
}

function transformUrlBySource(url, source, providerFn) {
  if (typeof url !== "string") {
    return url;
  }

  const normalizedSource = typeof source === "string" ? source.toLowerCase() : "";
  if (normalizedSource === "github") {
    return transformGithubUrl(url, providerFn);
  }

  return url;
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
