type BasePageInterface = {
  [path in keyof typeof PageInterface.PATHS]: {
    path: path;
    query: Record<string, string>;
  };
};

export interface PageInterface extends BasePageInterface {
  [PageInterface.PATHS.Root]: {
    path: typeof PageInterface.PATHS.Root;
    query: {};
  };
}

export namespace PageInterface {
  export const PATHS = {
    Root: '/',
  } as const;
  export type PATHS = keyof typeof PATHS;
}
