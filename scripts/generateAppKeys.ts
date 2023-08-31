import { randomBytes } from 'node:crypto';

async function main() {
  const keysMap = <{ [key: string]: { count: number; length: number } }>{
    SITE_SESSION_KEY: { count: 1, length: 32 }
  };

  const generateKey = (length = 16) => {
    return randomBytes(length).toString('base64');
  };

  const buffer = [];

  Object.entries(keysMap).forEach(([envKey, { count, length }]) => {
    const keys = Array(count)
      .fill(null)
      .map(() => generateKey(length));

    buffer.push(`${envKey}=${keys.join(',')}`);
  });

  console.log(buffer.join('\n'));
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
