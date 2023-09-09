import cookie from 'js-cookie';
import { dayjs } from '~/utils/dayjs';

export class Cookie {
  constructor(private __appName: string) {}

  private getSafeKey(key: string) {
    return `${this.__appName}-${key}`;
  }

  public set(
    key: string,
    value: string,
    expiresSeconds: number,
    options?: Omit<cookie.CookieAttributes, 'expires'>
  ) {
    return cookie.set(this.getSafeKey(key), value, {
      expires: dayjs().tz().add(expiresSeconds, 'seconds').toDate(),
      ...options,
    });
  }

  public get(key: string) {
    return cookie.get(this.getSafeKey(key));
  }

  public remove(key: string, options?: cookie.CookieAttributes) {
    return cookie.remove(this.getSafeKey(key), options);
  }
}

export namespace Cookie {
  // TODO: サービス名が変わったらここも変える
  export const App = new Cookie('app');
}
