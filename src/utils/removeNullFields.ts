export function removeNullFieldsDeep<T>(data: T[]): T[] {
  return data.map((item) => removeNullFromObject(item)) as T[];
}

export function removeNullFromObject<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(removeNullFromObject) as T;
  }

  if (
    obj instanceof Date ||
    obj instanceof Map ||
    obj instanceof Set ||
    typeof obj === 'function' ||
    typeof obj === 'symbol' ||
    typeof obj === 'bigint'
  ) {
    return obj as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        result[key] = removeNullFromObject(value);
      }
    }
    return result as T;
  }

  return obj;
}
