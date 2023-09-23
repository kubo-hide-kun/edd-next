import { Prisma, PrismaClient } from '@prisma-generated';
import type { Infrastructure } from '~/server/infrastructures';

export class PrimaInfrastructure {
  private _client: PrismaClient;

  constructor({ config }: Infrastructure) {
    const options: Prisma.PrismaClientOptions = {
      log: config.isDebug ? ['query', 'info', 'warn', 'error'] : [],
    };
    this._client = new PrismaClient(options);
  }

  static create(
    ...params: ConstructorParameters<typeof PrimaInfrastructure>
  ): PrimaInfrastructure {
    const repository = new PrimaInfrastructure(...params);
    return repository;
  }

  get client() {
    return this._client;
  }
}
