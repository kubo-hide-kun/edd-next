import { Repository } from '~/server/application/repositories';
import { Usecase } from '~/server/application/usecases';
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
    this.infrastructures = Infrastructure.build(infrastructureConfig);
    this.repositories = Repository.build(this);
    this.usecases = Usecase.build(this);
  }

  private _config!: Config;
  get config(): Config {
    return this._config;
  }

  private _logger!: unknown;
  get logger() {
    return this._logger;
  }

  private infrastructures!: ReturnType<(typeof Infrastructure)['build']>;
  get infrastructure() {
    return this.infrastructures;
  }

  private _now!: dayjs.Dayjs;
  get now() {
    return this._now;
  }

  private usecases!: ReturnType<(typeof Usecase)['build']>;
  get usecase() {
    return this.usecases;
  }

  private repositories!: ReturnType<(typeof Repository)['build']>;
  get repository() {
    return this.repositories;
  }
}
