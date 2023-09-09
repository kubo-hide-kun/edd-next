import { ValueOf } from '~/types/object';

type BasePutApiInterface = {
  [path in ValueOf<typeof PutApiInterface.PATHS>]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
};

export interface PutApiInterface extends BasePutApiInterface {
  [PutApiInterface.PATHS.User]: {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}

export namespace PutApiInterface {
  export const PATHS = {
    User: '/api/user',
  } as const;
  export type PATHS = keyof typeof PATHS;
}
