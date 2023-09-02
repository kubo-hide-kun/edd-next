import { dayjs } from '~/utils/dayjs';

type Config = {
  ipAddress?: string;
  authorization?: {
    userId: string;
  };
};

export class Context {
  constructor(config: Config) {
    this._config = config;
  }

  static create(...params: ConstructorParameters<typeof Context>): Context {
    const context = new Context(...params);
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
