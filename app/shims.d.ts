import { GlobalComponents as BaseGlobalComponents } from 'vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends BaseGlobalComponents {
    FontAwesomeIcon: typeof import('@fortawesome/vue-fontawesome')['FontAwesomeIcon'];
  }
}

declare module './.nuxt3/components' {
  export const FontAwesomeIcon = typeof import('@fortawesome/vue-fontawesome')['FontAwesomeIcon'];
}
