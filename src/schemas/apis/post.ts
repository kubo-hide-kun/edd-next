interface BasePostApiInterface {
  [path: string]: {
    query: Record<string, unknown>;
    response: Record<string, unknown>;
    request: Record<string, unknown>;
  };
}

export interface PostApiInterface extends BasePostApiInterface {
  '/api/user': {
    query: {};
    response: {
      status: 'ok';
    };
    request: {};
  };
}
