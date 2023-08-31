// import fsp from 'node:fs/promises';
// import { resolveAdminDir } from '../utils/admin';

export interface UseAdminEnums {}

let cached: UseAdminEnums;
export async function useAdminEnums(): Promise<UseAdminEnums> {
  if (cached) return cached;

  try {
    // const buffer = await fsp.readFile(resolveAdminDir('./api/order/content-types/order/schema.json'));
    // const orderJson = JSON.parse(buffer.toString('utf-8'));
    //
    // const {
    //   attributes: {
    //     deliveryMethod: { enum: delivery = [] } = {},
    //     paymentMethod: { enum: payment = [] } = {},
    //     status: { enum: status = [] } = {}
    //   } = {}
    // } = orderJson;

    cached = {};
    return cached;
  } catch (error) {
    // console.error('Чтобы использовать этот модуль, нужно сначала собрать админку (yarn dev:admin | yarn build:admin)');
    throw error;
  }
}
