export function removeNullFieldsDeep<T>(data: T[]): T[] {
  return data.map((item) => removeNullFromObject(item)) as T[];
}

export function removeNullFromObject<T>(obj: any): T | T[] {
  if (Array.isArray(obj)) {
    return obj.map(removeNullFromObject) as T[];
  }

  if (obj !== null && typeof obj === 'object') {
    const cleanedEntries = Object.entries(obj)
      .map(([key, value]) => {
        if (value === null || value === undefined) {
          return null;
        }

        if (typeof value === 'object') {
          const cleanedValue = removeNullFromObject(value);
          const isEmptyObject =
            cleanedValue &&
            typeof cleanedValue === 'object' &&
            !Array.isArray(cleanedValue) &&
            Object.keys(cleanedValue).length === 0;

          return isEmptyObject ? null : [key, cleanedValue];
        }

        return [key, value];
      })
      .filter((entry): entry is [string, any] => Array.isArray(entry));

    return Object.fromEntries(cleanedEntries) as T;
  }

  return obj;
}
