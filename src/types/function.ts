// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParametersOrEmpty<T extends (...args: any) => any> =
  | Parameters<T>
  | [];
