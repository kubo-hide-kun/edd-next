interface BaseGetApiInterface {
  [path: string]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request?: undefined;
  };
}

export interface GetApiInterface extends BaseGetApiInterface {
  '/api/user': {
    query: {};
    response: {
      status: 'ok';
    };
  };
  '/api/development/health-check': {
    query: {};
    response: {
      status: 'ok';
    };
  };
}
