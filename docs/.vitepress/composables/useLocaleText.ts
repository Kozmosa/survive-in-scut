import { computed } from "vue";
import { useData } from "vitepress";

export function useLocaleText<T>(zhText: T, enText: T) {
  const { localeIndex } = useData();

  return computed(() => (localeIndex.value === "en" ? enText : zhText));
}
