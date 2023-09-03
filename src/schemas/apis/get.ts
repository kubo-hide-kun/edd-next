import { User } from '~/schemas/entities/User';

interface BaseGetApiInterface {
  [path: string]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request?: undefined;
  };
}

export interface GetApiInterface extends BaseGetApiInterface {
  '/api/user/line/[lineId]': {
    query: {
      lineId: string;
    };
    response: {
      user: User.Dto;
    };
  };
  '/api/development/health-check': {
    query: {};
    response: {
      status: 'ok';
    };
  };
}
