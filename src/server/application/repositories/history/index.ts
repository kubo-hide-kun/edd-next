import { HistoryEntity } from '~/domains/models/History';
import { Context } from '~/server/application/context';
import { Repository } from '~/server/application/repositories';

export class HistoryRepository extends Repository {
  constructor(context: Readonly<Context>) {
    super('MemberRepository', context);
  }

  static create(...params: ConstructorParameters<typeof HistoryRepository>) {
    const repository = new HistoryRepository(...params);
    return repository;
  }

  /**
   * @description 立て替え履歴を 1 件取得する
   */
  public async getOne(conditions: Partial<Pick<HistoryEntity.Dto, 'id'>>) {
    const { prisma } = this.context.infrastructures;

    const found = await prisma.client.history.findUnique({
      include: { payeeHistories: true },
      where: conditions,
    });

    if (!found) {
      return null;
    }

    const history = HistoryEntity.create({
      id: found.id,
      lineGroupId: found.lineGroupId,
      name: found.name,
      summary: found.summary,
      amount: found.amount,
      payerId: found.payerId,
      payeeIds: found.payeeHistories.map((payee) => payee.userId),
      createdAt: found.createdAt.toString(),
      updatedAt: found.updatedAt.toString(),
    });

    return history;
  }

  /**
   * @description グループID に紐づく立て替え履歴を全件取得する
   */
  public async getByGroupId(
    conditions: Partial<Pick<HistoryEntity.Dto, 'lineGroupId'>>
  ) {
    const { prisma } = this.context.infrastructures;

    const found = await prisma.client.history.findMany({
      include: { payeeHistories: true },
      where: conditions,
    });

    if (!found) {
      return null;
    }

    const histories = found.map((history) =>
      HistoryEntity.create({
        id: history.id,
        lineGroupId: history.lineGroupId,
        name: history.name,
        summary: history.summary,
        amount: history.amount,
        payerId: history.payerId,
        payeeIds: history.payeeHistories.map((payee) => payee.userId),
        createdAt: history.createdAt.toString(),
        updatedAt: history.updatedAt.toString(),
      })
    );

    return histories;
  }

  /**
   * @description 新規立て替え履歴を作成する
   */
  public async create(params: Omit<HistoryEntity.Dto, 'id'>) {
    const { prisma } = this.context.infrastructures;

    const created = await prisma.client.history.create({
      data: {
        lineGroupId: params.lineGroupId,
        name: params.name,
        summary: params.summary,
        amount: params.amount,
        payerId: params.payerId,
        payeeHistories: {
          create: params.payeeIds.map((userId) => ({
            userId,
          })),
        },
      },
      include: { payeeHistories: true },
    });

    const history = HistoryEntity.create({
      id: created.id,
      lineGroupId: created.lineGroupId,
      name: created.name,
      summary: created.summary,
      amount: created.amount,
      payerId: created.payerId,
      payeeIds: created.payeeHistories.map((payee) => payee.userId),
      createdAt: created.createdAt.toString(),
      updatedAt: created.updatedAt.toString(),
    });

    return history;
  }
}
