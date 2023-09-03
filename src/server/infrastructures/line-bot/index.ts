import { Client } from '@line/bot-sdk';
import type { Infrastructure } from '~/server/infrastructures';

export class LineBotInfrastructure {
  private _client: Client;

  constructor({ config }: Infrastructure) {
    try {
      this._client = new Client({
        channelAccessToken: config.line.channelAccessToken,
        channelSecret: config.line.channelSecret,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  static create(
    ...params: ConstructorParameters<typeof LineBotInfrastructure>
  ): LineBotInfrastructure {
    const repository = new LineBotInfrastructure(...params);
    return repository;
  }

  get client() {
    return this._client;
  }
}
