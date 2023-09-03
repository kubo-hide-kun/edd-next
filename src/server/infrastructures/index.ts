import { LineBotInfrastructure } from '~/server/infrastructures/line-bot';
import { PrimaInfrastructure } from '~/server/infrastructures/prisma';

type Config = {
  isDebug: boolean;
  line: {
    channelSecret: string;
    channelAccessToken: string;
  };
};

export class Infrastructure {
  private _config!: Config;
  get config(): Config {
    return this._config;
  }

  constructor(config: Config) {
    this._config = config;
  }

  static build(
    ...params: ConstructorParameters<typeof Infrastructure>
  ): Infrastructure {
    const infrastructure = new Infrastructure(...params);
    infrastructure.init();
    return infrastructure;
  }

  private init(): void {
    this._lineBot = LineBotInfrastructure.create(this);
    this._prisma = PrimaInfrastructure.create(this);
  }

  private _lineBot!: ReturnType<(typeof LineBotInfrastructure)['create']>;
  get lineBot() {
    return this._lineBot;
  }

  private _prisma!: ReturnType<(typeof PrimaInfrastructure)['create']>;
  get prisma() {
    return this._prisma;
  }
}
