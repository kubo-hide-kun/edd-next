import {
  default as createConnectRouter,
  type NextConnect,
  type Middleware as NextConnectMiddleware,
} from 'next-connect';
import type { CustomNextApi } from '~/server/handlers/utils/next-api';

export type CustomNextConnect = NextConnect<
  CustomNextApi.Request,
  CustomNextApi.Response
>;

export namespace CustomNextConnect {
  export type Export = {
    router: CustomNextConnect;
    individualRouter: CustomNextConnect;
  };

  export type Middleware = NextConnectMiddleware<
    CustomNextApi.Request,
    CustomNextApi.Response
  >;

  export const create = (middlewares: Middleware[] = []): CustomNextConnect => {
    const connect = createConnectRouter<
      CustomNextApi.Request,
      CustomNextApi.Response
    >();
    middlewares.forEach((middleware) => {
      connect.use(middleware);
    });
    return connect;
  };
}

/**
 * IPアドレスをリクエストに追加するミドルウェア
 */
export const AddIpAddressMiddleware: CustomNextConnect.Middleware = (
  req,
  _,
  next
) => {
  const xForwardedFor = req.headers['x-forwarded-for'];

  if (Array.isArray(xForwardedFor)) {
    req.ipAddress = xForwardedFor[0];
    return next();
  }

  req.ipAddress = xForwardedFor ?? req.socket.remoteAddress;

  return next();
};
