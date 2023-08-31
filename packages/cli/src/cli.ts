// FIXME: SET CONFIG

#!/usr/bin/node

import { execa, Options } from 'execa';
import mri from 'mri';

type AvailableCommands =
  | 'dev:app'
  | 'build:app'
  | 'prepare:app'
  | 'preview:app';

async function main() {
  const args = mri(process.argv.slice(2));
  const command = args._[0] as AvailableCommands;

  const execaOptions: Options = {
    stdio: 'inherit',
    extendEnv: true,
    env: {}
  };

  if (command.endsWith(':app')) {
    execaOptions.env.HOST = config.app.host;
    execaOptions.env.PORT = config.app.port as string;
  }

  if (['dev:app', 'build:app', 'prepare:app', 'preview:app'].includes(command)) {
    await execa('yarn', ['nuxt', command.replace(':app', ''), config.app.dir], execaOptions);
    process.exit(0);
  }

  throw new Error(
    `Unknown command ${command}! Available commands: dev:app|build:app|preview:app|prepare:app`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
