interface BasePutApiInterface {
  [path: string]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
}

export interface PutApiInterface extends BasePutApiInterface {
  '/api/user': {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}
