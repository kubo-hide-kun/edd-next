import { ValueOf } from '~/types/object';

type BasePostApiInterface = {
  [path in ValueOf<typeof PostApiInterface.PATHS>]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
};

export interface PostApiInterface extends BasePostApiInterface {
  [PostApiInterface.PATHS.User]: {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}

export namespace PostApiInterface {
  export const PATHS = {
    User: '/api/user',
  } as const;
  export type PATHS = keyof typeof PATHS;
}
