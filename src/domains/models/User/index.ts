import { Entity } from '~/domains/models';
import { dayjs, createSafeDayjs } from '~/utils/dayjs';

export class UserEntity extends Entity<UserEntity.Dto> {
  id: string;
  lineId: string;
  lineDisplayName?: string;
  ableToReceiveMessage: boolean;
  approveUpdateTermsAt?: dayjs.Dayjs;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;

  constructor(dto: UserEntity.Dto) {
    super();
    this.id = dto.id;
    this.lineId = dto.lineId;
    this.lineDisplayName = dto.lineDisplayName;
    this.ableToReceiveMessage = dto.ableToReceiveMessage;
    this.approveUpdateTermsAt = createSafeDayjs(dto.approveUpdateTermsAt);

    const createdAt = createSafeDayjs(dto.createdAt);
    if (!createdAt.isValid()) {
      throw new Error(`invalid createdAt ${dto.createdAt}`);
    }
    this.createdAt = createdAt;

    const updatedAt = createSafeDayjs(dto.updatedAt);
    if (!updatedAt.isValid()) {
      throw new Error(`invalid updatedAt ${dto.updatedAt}`);
    }
    this.updatedAt = updatedAt;
  }

  static create(...params: ConstructorParameters<typeof UserEntity>) {
    const entity = new UserEntity(...params);
    return entity;
  }

  public get dto(): UserEntity.Dto {
    return {
      id: this.id,
      lineId: this.lineId,
      lineDisplayName: this.lineDisplayName,
      ableToReceiveMessage: this.ableToReceiveMessage,
      approveUpdateTermsAt: this.approveUpdateTermsAt?.toISOString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  public get nonSensitiveDto(): UserEntity.Dto {
    return {
      ...this.dto,
      lineDisplayName: '*',
    };
  }
}

export namespace UserEntity {
  export type Dto = {
    id: string;
    lineId: string;
    lineDisplayName?: string;
    ableToReceiveMessage: boolean;
    approveUpdateTermsAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}
