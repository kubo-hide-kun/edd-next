import { ValueOf } from '~/types/object';

type BaseDeleteApiInterface = {
  [path in ValueOf<typeof DeleteApiInterface.PATHS>]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
};

export interface DeleteApiInterface extends BaseDeleteApiInterface {
  [DeleteApiInterface.PATHS.User]: {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}

export namespace DeleteApiInterface {
  export const PATHS = {
    User: '/api/user',
  } as const;
  export type PATHS = keyof typeof PATHS;
}
