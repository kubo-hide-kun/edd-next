interface BaseDeleteApiInterface {
  [path: string]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
}

export interface DeleteApiInterface extends BaseDeleteApiInterface {
  '/api/user': {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}
