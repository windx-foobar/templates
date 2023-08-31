import { config as dotenvConfig } from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import { resolve } from 'node:path';

import { defineConfig } from './utils';

const envPath = resolve(__dirname, `../../../.env`);

let env;

function sanitaizeEnvValue(value: unknown): unknown | undefined {
  if (!value) return undefined;

  if (typeof value === 'string') {
    return value === 'tobemodified' ? undefined : value;
  }

  return value;
}

try {
  const result = dotenvConfig({ path: envPath });
  if (result.error) throw result.error;

  env = {
    ...dotenvParseVariables(result.parsed),
    MONOREPO_CRM_PORT: process.env.MONOREPO_CRM_PORT || undefined,
    MONOREPO_CRM_HOST: process.env.MONOREPO_CRM_PORT || undefined,
    MONOREPO_LK_PORT: process.env.MONOREPO_LK_PORT || undefined,
    MONOREPO_LK_HOST: process.env.MONOREPO_LK_HOST || undefined
  };

  if (typeof process.env === 'object') {
    // SITE logger level
    process.env.CONSOLA_LEVEL = sanitaizeEnvValue(env.LOG_LEVEL) as string;
  }

  env.NODEMAILER_HOST = sanitaizeEnvValue(env.NODEMAILER_HOST);
  env.NODEMAILER_PORT = sanitaizeEnvValue(env.NODEMAILER_PORT);
  env.NODEMAILER_USERNAME = sanitaizeEnvValue(env.NODEMAILER_USERNAME);
  env.NODEMAILER_PASSWORD = sanitaizeEnvValue(env.NODEMAILER_PASSWORD);
  env.NODEMAILER_DEFAULT_FROM = sanitaizeEnvValue(env.NODEMAILER_DEFAULT_FROM);
} catch (error) {
  throw error;
}

export default defineConfig({
  /**
   * @description Общая конфигурация
   */
  shared: {
    name: 'Возврат Онлайн',
    nodemailer: {
      enable: !!env.NODEMAILER_HOST && !!env.NODEMAILER_PORT,
      host: env.NODEMAILER_HOST,
      port: env.NODEMAILER_PORT,
      ...(env.NODEMAILER_USERNAME && env.NODEMAILER_PASSWORD
        ? {
            auth: {
              user: env.NODEMAILER_USERNAME,
              pass: env.NODEMAILER_PASSWORD
            }
          }
        : {}),
      defaultFrom: env.NODEMAILER_DEFAULT_FROM
    }
  },

  /**
   * @description Конфигурация для crm
   */
  crm: {
    host: env.MONOREPO_CRM_HOST || '0.0.0.0',
    port: env.MONOREPO_CRM_PORT || '3000',
    dir: resolve(__dirname, '../../..', env.MONOREPO_CRM_PATH || './crm'),
    sessions: {
      public: {
        password: env.SITE_SESSION_KEY,
        sslOnly: typeof env.SESSION_SSL_ONLY === 'boolean' ? env.SESSION_SSL_ONLY : true
      }
    }
  },

  /**
   * @description Конфигурация для клиентской части (сайта/лк)
   */
  lk: {
    host: env.MONOREPO_LK_HOST || '0.0.0.0',
    port: env.MONOREPO_LK_PORT || '3000',
    dir: resolve(__dirname, '../../..', env.MONOREPO_LK_PATH || './crm')
  }
});
