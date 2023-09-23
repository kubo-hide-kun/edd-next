import { UserEntity } from '~/domains/models/User';
import { ValueOf } from '~/types/object';

type BaseGetApiInterface = {
  [path in ValueOf<typeof GetApiInterface.PATHS>]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request?: undefined;
  };
};

export interface GetApiInterface extends BaseGetApiInterface {
  // NOTE: このエンドポイントはサンプルなので実際には不要
  [GetApiInterface.PATHS.LineUser]: {
    query: {
      lineUid: string;
    };
    response: {
      user: UserEntity.Dto;
    };
  };
  [GetApiInterface.PATHS.HealthCheck]: {
    query: {};
    response: {
      status: 'ok';
    };
  };
}

export namespace GetApiInterface {
  export const PATHS = {
    LineUser: '/api/user/line/[lineUid]',
    HealthCheck: '/api/development/health-check',
  } as const;
  export type PATHS = keyof typeof PATHS;
}
