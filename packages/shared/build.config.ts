import { defineBuildConfig } from 'unbuild';

const isProd = ['production', 'staging'].includes(process.env.NODE_ENV);

export default defineBuildConfig({
  declaration: true,
  stub: !isProd,
  clean: true,
  entries: ['src/index'],
  rollup: {
    emitCJS: true,
    cjsBridge: true
  },
  failOnWarn: isProd
});
