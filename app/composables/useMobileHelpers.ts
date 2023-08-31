import { debounce } from 'perfect-debounce';
import type { Ref } from 'vue';

interface UseMobileHelpers {
  isXs: Ref<boolean>;
  isSm: Ref<boolean>;
  isMd: Ref<boolean>;
  isLg: Ref<boolean>;
  isXl: Ref<boolean>;
  isXxl: Ref<boolean>;
}

const LAYOUT_BREAKPOINT_SM = 576;
const LAYOUT_BREAKPOINT_MD = 768;
const LAYOUT_BREAKPOINT_LG = 992;
const LAYOUT_BREAKPOINT_XL = 1200;
const LAYOUT_BREAKPOINT_XXL = 1920;

let cached: UseMobileHelpers;

export function useMobileHelpers(): UseMobileHelpers {
  if (cached) return cached;

  const isAlreadyInitialized = ref<boolean>(false);
  const width = ref<number>(0);
  const isXs = computed<boolean>(() => width.value !== 0 && width.value < LAYOUT_BREAKPOINT_SM);
  const isSm = computed<boolean>(() => LAYOUT_BREAKPOINT_SM < width.value);
  const isMd = computed<boolean>(() => LAYOUT_BREAKPOINT_MD < width.value);
  const isLg = computed<boolean>(() => LAYOUT_BREAKPOINT_LG < width.value);
  const isXl = computed<boolean>(() => LAYOUT_BREAKPOINT_XL < width.value);
  const isXxl = computed<boolean>(() => LAYOUT_BREAKPOINT_XXL < width.value);

  function setWidth() {
    width.value = window?.innerWidth || document?.documentElement?.clientWidth || document?.body?.clientWidth;
  }

  onMounted(async () => {
    if (isAlreadyInitialized.value) return;

    await nextTick();

    setWidth();
    const debouncedFn = debounce(setWidth, 200);
    window.addEventListener('resize', debouncedFn);
  });

  cached = { isXs, isSm, isMd, isLg, isXl, isXxl };
  return cached;
}
