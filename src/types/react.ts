export type InferComponentPropsType<T> = T extends React.ComponentType<infer P>
  ? P
  : never;
