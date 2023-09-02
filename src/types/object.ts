export type KeyType<T extends Record<string, unknown>> = T[keyof T];
