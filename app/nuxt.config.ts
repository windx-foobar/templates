import { NuxtConfig } from '@nuxt/schema';
import { NuxtConfig as _NuxtConfig } from 'nuxt/schema';
import config from '@ttt/config';

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(<NuxtConfig & _NuxtConfig>{
  rootDir: config.app.dir,
  buildDir: './.nuxt3',
  telemetry: {
    enabled: false
  },
  devServer: {
    url: `http://${HOST}:${PORT}`,
    host: HOST,
    port: PORT as any
  },
  nitro: {
    // externals: ['@vozvrat-online/config'],
    unenv: {
      alias: {
        consola: 'consola'
      }
    }
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  appConfig: {
    companyName: config.shared.name
  },
  // imports: {
  //   presets: [
  //     {
  //       from: '@vozvrat-online/utils/client',
  //       imports: ['useUtils', 'useDate']
  //     }
  //   ]
  // },
  app: {
    head: {
      titleTemplate: `${config.shared.name} | %s`,
      link: [
        { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }
      ]
    }
  }
});
