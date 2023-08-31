#!/usr/bin/node

import { execa, Options } from 'execa';
import mri from 'mri';
import config from '@vozvrat-online/config';

type AvailableCommands =
  | 'dev:lk'
  | 'build:lk'
  | 'prepare:lk'
  | 'preview:lk'
  | 'dev:crm'
  | 'build:crm'
  | 'prepare:crm'
  | 'preview:crm';

async function main() {
  const args = mri(process.argv.slice(2));
  const command = args._[0] as AvailableCommands;

  const execaOptions: Options = {
    stdio: 'inherit',
    extendEnv: true,
    env: {}
  };

  if (command.endsWith(':lk')) {
    execaOptions.env.HOST = config.lk.host;
    execaOptions.env.PORT = config.lk.port as string;
  }

  if (command.endsWith(':crm')) {
    execaOptions.env.HOST = config.crm.host;
    execaOptions.env.PORT = config.crm.port as string;
  }

  if (['dev:lk', 'build:lk', 'prepare:lk', 'preview:lk'].includes(command)) {
    await execa('yarn', ['nuxt', command.replace(':lk', ''), config.lk.dir], execaOptions);
    process.exit(0);
  }

  if (['dev:crm', 'build:crm', 'prepare:crm', 'preview:crm'].includes(command)) {
    await execa('yarn', ['nuxt', command.replace(':crm', ''), config.crm.dir], execaOptions);
    process.exit(0);
  }

  throw new Error(
    `Unknown command ${command}! Available commands: dev:lk|build:lk|preview:lk|prepare:lk|dev:crm|build:crm|preview:crm|prepare:crm`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
