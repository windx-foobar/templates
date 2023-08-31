import * as fsp from 'node:fs/promises';
import { resolve, relative } from 'pathe';
import { defineBuildConfig } from 'unbuild';

const isProd = ['production', 'staging'].includes(process.env.NODE_ENV);

export default defineBuildConfig({
  declaration: true,
  stub: !isProd,
  clean: true,
  entries: ['src/index', 'src/unplugin', 'src/client'],
  rollup: {
    emitCJS: true,
    cjsBridge: true
  },
  failOnWarn: isProd,
  hooks: {
    async 'rollup:done'(ctx) {
      await fixClient(ctx.options.outDir, ctx.options.rootDir);
    }
  }
});

async function fixClient(outDir: string, rootDir: string) {
  const srcFilePath = relative(outDir, resolve(rootDir, 'src/client'));

  const replaceFile = async (filePath: string, isCjs: boolean) => {
    if (isCjs) {
      await fsp.writeFile(filePath, `module.exports = require('${srcFilePath}');`);
    } else {
      await fsp.writeFile(filePath, `export * from '${srcFilePath}';`);
    }
  };

  try {
    const cjsFile = resolve(outDir, 'client.cjs');
    const mjsFile = resolve(outDir, 'client.mjs');

    try {
      await replaceFile(cjsFile, true);
    } catch (error) {
      console.warn('cjs file warning', error);
      console.log('skipped...');
    }

    try {
      await replaceFile(mjsFile, false);
    } catch (error) {
      console.warn('mjs file warning', error);
      console.log('skipped...');
    }
  } catch (error) {
    throw error;
  }
}
