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

/**
 * @description
 * このクラスは、APIのハンドラを作成するためのクラスです。
 * リソースごとに1つのインスタンスを作成してください。
 *
 * PATH: APIのパスを表す文字列の型です（例: '/api/users'）
 * INDIVIDUAL_PATH: 個別のAPIのパスを表す文字列の型です（例: '/api/users/[userId]'）
 */
export abstract class Api<PATH extends string, INDIVIDUAL_PATH extends string> {
  public application: Application;

  /**
   * @description
   * このプロパティは、APIのハンドラ(PATH)を格納するためのプロパティです。
   * 追加したいハンドラを、このプロパティに格納してください。
   *
   * @example
   * userApi.connectHandlers.get = async (request, response) => {
   *  // ...
   * }
   */

  public connectHandlers: ApiHandlers<PATH> = {
    get: null,
    post: null,
    put: null,
    del: null,
  };

  /**
   * @description
   * このプロパティは、APIのハンドラ(INDIVIDUAL_PATH)を格納するためのプロパティです。
   * 追加したいハンドラを、このプロパティに格納してください。
   *
   * @example
   * userApi.individualConnectHandlers.get = async (request, response) => {
   *   // ...
   * }
   */
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

  private _init(request: CustomNextApi.Request): void {
    this.application = new Application({
      ipAddress: request.ipAddress,
      authorization: request.authorization,
    });
  }

  private _createConnect<_PATH extends string>(
    params: Parameters<typeof CustomNextConnect.create>,
    handlers: ApiHandlers<_PATH>
  ) {
    const connect = CustomNextConnect.create(...params);
    const { get, post, put, del } = handlers;

    if (get) {
      connect.get(async (request, response) => {
        this._init(request);
        await get(request, response);
      });
    }
    if (post) {
      connect.post(async (request, response) => {
        this._init(request);
        await post(request, response);
      });
    }
    if (put) {
      connect.put(async (request, response) => {
        this._init(request);
        await put(request, response);
      });
    }
    if (del) {
      connect.delete(async (request, response) => {
        this._init(request);
        await del(request, response);
      });
    }

    return connect;
  }

  /**
   * @description
   * next-connectのインスタンスを作成するためのメソッドです。
   */
  public createConnect(...params: Parameters<typeof CustomNextConnect.create>) {
    return this._createConnect(params, this.connectHandlers);
  }

  /**
   * @description
   * next-connectのインスタンスを作成するためのメソッドです。
   */
  public createIndividualConnect(
    ...params: Parameters<typeof CustomNextConnect.create>
  ) {
    return this._createConnect(params, this.individualConnectHandlers);
  }
}
