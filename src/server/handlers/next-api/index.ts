import { DeleteApiInterface } from '~/schemas/apis/delete';
import { GetApiInterface } from '~/schemas/apis/get';
import { PostApiInterface } from '~/schemas/apis/post';
import { PutApiInterface } from '~/schemas/apis/put';
import { Application } from '~/server/application';
import { CustomNextApi } from '~/server/handlers/utils/next-api';
import { CustomNextConnect } from '~/server/handlers/utils/next-connect';

type ApiHandlers<PATH extends string> = {
  get: CustomNextApi.Handler<
    PATH extends keyof GetApiInterface ? GetApiInterface[PATH] : never
  > | null;
  post: CustomNextApi.Handler<
    PATH extends keyof PostApiInterface ? PostApiInterface[PATH] : never
  > | null;
  put: CustomNextApi.Handler<
    PATH extends keyof PutApiInterface ? PutApiInterface[PATH] : never
  > | null;
  del: CustomNextApi.Handler<
    PATH extends keyof DeleteApiInterface ? DeleteApiInterface[PATH] : never
  > | null;
};

export abstract class Api<PATH extends string, INDIVIDUAL_PATH extends string> {
  public application: Application;

  public connectHandlers: ApiHandlers<PATH> = {
    get: null,
    post: null,
    put: null,
    del: null,
  };
  public individualConnectHandlers: ApiHandlers<INDIVIDUAL_PATH> = {
    get: null,
    post: null,
    put: null,
    del: null,
  };

  constructor(
    protected name: string,
    protected path: PATH,
    protected individualPath: INDIVIDUAL_PATH
  ) {}

  public init({
    ipAddress,
    authorization,
  }: {
    ipAddress?: string;
    authorization?: {
      userId: string;
    };
  }): void {
    this.application = new Application({
      ipAddress,
      authorization,
    });
  }

  private __createConnect<PATH extends string>(
    params: Parameters<typeof CustomNextConnect.create>,
    handlers: ApiHandlers<PATH>
  ) {
    const connect = CustomNextConnect.create(...params);
    const { get, post, put, del } = handlers;

    if (get) {
      connect.get(get);
    }
    if (post) {
      connect.post(post);
    }
    if (put) {
      connect.put(put);
    }
    if (del) {
      connect.delete(del);
    }

    return connect;
  }

  public createConnect(...params: Parameters<typeof CustomNextConnect.create>) {
    return this.__createConnect(params, this.connectHandlers);
  }

  public createIndividualConnect(
    ...params: Parameters<typeof CustomNextConnect.create>
  ) {
    return this.__createConnect(params, this.individualConnectHandlers);
  }
}
