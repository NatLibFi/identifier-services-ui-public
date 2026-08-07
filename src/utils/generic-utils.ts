export function deepCopy<T extends Record<string, unknown>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Using parseInt / Number constructor is problematic when converting a string to number
// Since all URL parameters are interpreted as string, they need to be properly converted
// so that an unified method of handling all IDs as number can be used
export function asIdNumber(value: string): number {
  if (!/^[1-9][0-9]*$/.test(value)) {
    throw new Error(`String ${value} cannot be interpreted as number`);
  }

  const valueAsNumber = Number(value);

  if (!Number.isSafeInteger(valueAsNumber)) {
    throw new Error(
      `String ${value} exceeds safe integer limit for JavaScript (and also for MySQL unsigned integer column!)`,
    );
  }

  return valueAsNumber;
}
