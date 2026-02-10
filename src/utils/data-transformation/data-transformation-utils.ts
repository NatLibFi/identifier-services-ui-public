import { deepCopy } from '@/utils/generic-utils';

export function removeUndefinedOrEmptyString<T extends Record<string, unknown>>(data: T) {
  const dataCopy = deepCopy<T>(data);

  // Remove empty strings and undefined data from dataCopy
  Object.keys(dataCopy).forEach((key) => {
    const value = dataCopy[key as keyof T];
    const isUndefined = value === undefined;
    const isEmptyString = value === '';

    if (isUndefined || isEmptyString) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete dataCopy[key as keyof T];
    }
  });

  return dataCopy;
}
