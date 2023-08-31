import { defineBuildConfig } from 'unbuild';

const isProd = ['production', 'staging'].includes(process.env.NODE_ENV);

export default defineBuildConfig({
  declaration: false,
  stub: !isProd,
  entries: ['src/cli'],
  dependencies: [],
  externals: ['@vozvrat-online/config']
});
