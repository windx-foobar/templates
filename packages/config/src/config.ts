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
    name: 'Nuxt3 boilerplate'
  },

  /**
   * @description Nuxt3 App config
   */
  app: {
    host: env.MONOREPO_LK_HOST || '0.0.0.0',
    port: env.MONOREPO_LK_PORT || '3000',
    dir: resolve(__dirname, '../../..', env.MONOREPO_LK_PATH || './crm')
  }
});
