/**
 * enumのバリデーション
 */
export const validateEnum =
  <T extends string, U>(enumObject: Record<T, U>) =>
  (value: unknown): value is U =>
    Object.values(enumObject).includes(value as U);

/**
 * enumのバリデーションと変換を行う
 */
export const convertEnum =
  <T extends string, U>(enumObject: Record<T, U>) =>
  (value: unknown): U => {
    if (!validateEnum(enumObject)(value)) {
      throw new Error(`error: Invalid value: ${value}`);
    }
    return value;
  };
