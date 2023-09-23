import { Entity } from '~/domains/models';
import { dayjs, createSafeDayjs } from '~/utils/dayjs';

export class HistoryEntity extends Entity<HistoryEntity.Dto> {
  id: string;
  groupId: string;
  name: string;
  summary: string;
  amount: number;
  payeeIds: string[];
  payerId: string;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;

  constructor(dto: HistoryEntity.Dto) {
    super();
    this.id = dto.id;
    this.groupId = dto.lineGroupId;
    this.name = dto.name;
    this.amount = dto.amount;
    this.summary = dto.summary;
    this.payeeIds = dto.payeeIds;
    this.payerId = dto.payerId;

    const createdAt = createSafeDayjs(dto.createdAt);
    if (!createdAt) {
      throw new Error(`invalid createdAt ${dto.createdAt}`);
    }
    this.createdAt = createdAt;

    const updatedAt = createSafeDayjs(dto.updatedAt);
    if (!createdAt) {
      throw new Error(`invalid updatedAt ${dto.updatedAt}`);
    }
    this.updatedAt = updatedAt;
  }

  static create(...params: ConstructorParameters<typeof HistoryEntity>) {
    const entity = new HistoryEntity(...params);
    return entity;
  }

  public get dto(): HistoryEntity.Dto {
    return {
      id: this.id,
      lineGroupId: this.groupId,
      name: this.name,
      summary: this.summary,
      amount: this.amount,
      payeeIds: this.payeeIds,
      payerId: this.payerId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  public get nonSensitiveDto(): HistoryEntity.Dto {
    return {
      ...this.dto,
    };
  }
}

export namespace HistoryEntity {
  export type Dto = {
    id: string;
    lineGroupId: string;
    name: string;
    summary: string;
    amount: number;
    payeeIds: string[];
    payerId: string;
    createdAt: string;
    updatedAt: string;
  };
}
