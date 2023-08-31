import { createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
// import MagicString from 'magic-string';
// import { useAdminEnums } from './index';

const defaultIncludes = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/];
const defaultExcludes = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/];

export default createUnplugin((options = {}, meta) => {
  const filter = createFilter(defaultIncludes, defaultExcludes);

  let cached;

  return {
    name: 'vozvrat-online-utils-plugin',
    enforce: 'pre',
    // async buildStart() {
    //   cached = await useAdminEnums();
    // },
    // transformInclude(id) {
    //   return filter(id);
    // },
    // transform(code, id) {
    //   const s = new MagicString(code);
    //
    //   s.replaceAll(/(.*)useAdminEnums\(\)(.*)/g, (_, $1: string, $2: string) => {
    //     return `${$1}${JSON.stringify(cached)}${$2}`;
    //   });
    //
    //   return {
    //     code: s.toString(),
    //     map: s.generateMap()
    //   };
    // }
  };
});
