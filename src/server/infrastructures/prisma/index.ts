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

  // /**
  //  * 一覧取得（一覧と件数を同時に取得する）
  //  */
  // async customFindMany<
  //   ModelName extends ValueOf<{
  //     [K in keyof PrismaClient]: PrismaClient[K] extends {
  //       findMany: unknown;
  //       count: unknown;
  //     }
  //       ? K
  //       : never;
  //   }>
  // >(
  //   modelName: ModelName,
  //   {
  //     size = 99,
  //     page = 1,
  //     ...args
  //   }: Omit<
  //     Parameters<PrismaClient[ModelName]['findMany']>[0],
  //     'skip' | 'take'
  //   > & {
  //     page?: number;
  //     size?: number;
  //   }
  // ) {
  //   const query = {
  //     ...args,
  //     take: size,
  //     skip: (page - 1) * size,
  //   };

  //   const [founds, count] = await this.client.$transaction([
  //     this.client[modelName].findMany(query),
  //     this.client[modelName].count({ where: args.where }),
  //   ]);

  //   return {
  //     items: founds,
  //     size: size,
  //     page: page,
  //     total: count,
  //   };
  // }
}
