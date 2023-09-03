import { build as buildRepositories } from '~/server/application/repositories/build';
import { build as buildUsecases } from '~/server/application/usecases/build';
import { Infrastructure } from '~/server/infrastructures';
import { dayjs } from '~/utils/dayjs';

type Config = {
  ipAddress?: string;
  authorization?: {
    userId: string;
  };
};

const infrastructureConfig: Infrastructure['config'] = {
  isDebug: process.env.NODE_ENV !== 'production',
  line: {
    channelSecret: process.env.LINE_CHANNEL_SECRET ?? '',
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '',
  },
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
    this._infrastructures = Infrastructure.build(infrastructureConfig);
    this._repositories = buildRepositories(this);
    this._usecases = buildUsecases(this);
  }

  private _config!: Config;
  get config(): Config {
    return this._config;
  }

  private _logger!: unknown;
  get logger() {
    return this._logger;
  }

  private _infrastructures!: ReturnType<(typeof Infrastructure)['build']>;
  get infrastructures() {
    return this._infrastructures;
  }

  private _now!: dayjs.Dayjs;
  get now() {
    return this._now;
  }

  private _usecases!: ReturnType<typeof buildUsecases>;
  get usecases() {
    return this._usecases;
  }

  private _repositories!: ReturnType<typeof buildRepositories>;
  get repositories() {
    return this._repositories;
  }
}
