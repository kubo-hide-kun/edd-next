import { dayjs } from '~/utils/dayjs';

type Config = {};

export class Context {
  constructor() {}

  static create(): Context {
    const context = new Context();
    context.init();
    return context;
  }

  public init(): void {
    this._logger = null;
    this._now = dayjs().tz();
  }

  private _config!: Config;
  get config(): Config {
    return this._config;
  }

  private _logger!: unknown;
  get logger(): unknown {
    return this._logger;
  }

  private _now!: dayjs.Dayjs;
  get now(): dayjs.Dayjs {
    return this._now;
  }
}
