import cookie from 'js-cookie';
import { dayjs } from '~/utils/dayjs';

export class Cookie {
  constructor(private _appName: string) {}

  private _getSafeKey(key: string) {
    return `${this._appName}-${key}`;
  }

  public set(
    key: string,
    value: string,
    expiresSeconds: number,
    options?: Omit<cookie.CookieAttributes, 'expires'>
  ) {
    return cookie.set(this._getSafeKey(key), value, {
      expires: dayjs().tz().add(expiresSeconds, 'seconds').toDate(),
      ...options,
    });
  }

  public get(key: string) {
    return cookie.get(this._getSafeKey(key));
  }

  public remove(key: string, options?: cookie.CookieAttributes) {
    return cookie.remove(this._getSafeKey(key), options);
  }
}

export namespace Cookie {
  // TODO: サービス名が変わったらここも変える
  export const App = new Cookie('app');
}
