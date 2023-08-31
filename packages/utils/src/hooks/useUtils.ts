import _ from 'lodash';

export interface UseUtils {
  phoneReplacer(firstGroup: string, secondGroup: string, thirdGroup: string, fourthGroup: string): string;
  normalizeMobile(value: string, withPlus?: boolean): string;
  normalizePhone(value: string, withPlus?: boolean): string;
  denormalizeMobile(value: string): string;
  denormalizePhone(value: string): string;
  moneyFormat(value: any, defaultValue?: any, strict?: boolean): string | any;
  deepGet<T = any>(object: Record<string, any>, path: string, defaultValue?: any): T;
  deepFindInArray<T = any, R = any>(
    object: Record<string, any>,
    path: string,
    eqValue: T,
    valuePath?: string,
    defaultValue?: any
  ): R;
}

export function useUtils(): UseUtils {
  const phoneReplacer: UseUtils['phoneReplacer'] = (firstGroup, secondGroup, thirdGroup, fourthGroup) => {
    return `+7 (${firstGroup}) ${secondGroup}-${thirdGroup}-${fourthGroup}`;
  };

  const normalizeMobile: UseUtils['normalizeMobile'] = (value, withPlus = false) =>
    !!value ? value.replace(/\D/g, '').replace(/^(\+?7|8)?(9\d{9})$/i, `${withPlus ? '+' : ''}7$2`) : value;

  const normalizePhone: UseUtils['normalizePhone'] = (value, withPlus = false) =>
    !!value ? value.replace(/\D/g, '').replace(/^(\+?7|8)?(\d{10})$/i, `${withPlus ? '+' : ''}7$2`) : value;

  const denormalizeMobile: UseUtils['denormalizeMobile'] = (value) => {
    const normalized = normalizeMobile(value);
    const [_, firstGroup, ...groups] = normalized.match(/^79(\d{2})(\d{3})(\d{2})(\d{2})$/);

    return phoneReplacer(`9${firstGroup}`, ...(groups as [string, string, string]));
  };

  const denormalizePhone: UseUtils['denormalizePhone'] = (value) => {
    const normalized = normalizeMobile(value);
    const [_, ...groups] = normalized.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/);

    return phoneReplacer(...(groups as [string, string, string, string]));
  };

  const moneyFormat: UseUtils['moneyFormat'] = (value, defaultValue = null, strict = true) => {
    const numberizedValue = +value;
    if (strict) {
      if (!numberizedValue) return defaultValue;
    } else {
      if (isNaN(numberizedValue)) return defaultValue;
    }

    const intl = new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol'
    });

    return intl.format(numberizedValue);
  };

  const deepGet: UseUtils['deepGet'] = (object, path, defaultValue = null) => {
    const value = _.get(object, path, defaultValue);

    if (!value) return defaultValue;

    return value;
  };

  const deepFindInArray: UseUtils['deepFindInArray'] = <T = any>(
    object,
    path,
    eqValue,
    valuePath = null,
    defaultValue = null
  ) => {
    let endPath: string;

    const splittedPath = path.split('.');

    const findPath = path.split('.').slice(0, -1).join('.');

    const arr = deepGet<Record<string, any>[]>(object, findPath);
    const findedIdx = arr.findIndex((item) => deepGet<T>(item, splittedPath.slice(-1)[0]) === eqValue);

    if (findedIdx === -1) return defaultValue;

    endPath = `${findPath}[${findedIdx}]`;
    if (valuePath) {
      endPath += `.${valuePath}`;
    }
    return deepGet<T>(object, endPath, defaultValue);
  };

  return {
    phoneReplacer,
    normalizePhone,
    normalizeMobile,
    denormalizeMobile,
    denormalizePhone,
    moneyFormat,
    deepGet,
    deepFindInArray
  };
}
