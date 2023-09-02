/**
 * オブジェクトのネストされた値を取得するためのものです。
 */
export const extractValueFromNestedObject = <T>(
  obj: object,
  targetKey: string
): T | undefined => {
  let result: T | undefined = undefined;

  Object.entries(obj).forEach(([key, value]) => {
    if (result) {
      return;
    }

    if (key === targetKey) {
      result = value;
    } else if (Array.isArray(value)) {
      result = value
        .map((v) =>
          typeof v === 'object'
            ? extractValueFromNestedObject<T>(v, targetKey)
            : undefined
        )
        .find(Boolean);
    } else if (typeof value === 'object') {
      result = extractValueFromNestedObject<T>(value, targetKey);
    }
  });

  return result;
};

/**
 * オブジェクトの値がundefinedの場合に、その値をキーごと削除します。
 */
export const omitUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as T;
};
