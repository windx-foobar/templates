import { resolve } from 'pathe';

export const adminDir: string = resolve(__dirname, '../../../../admin/dist/src');

export const resolveAdminDir = (...paths: string[]) => {
  return resolve(adminDir, ...paths);
};
