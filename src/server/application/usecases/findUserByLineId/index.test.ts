import { describe, test, expect } from '@jest/globals';
import { UserEntity } from '~/domains/models/User';
import { Context } from '~/server/application/context';
import { FindUserByLineIdUsecase } from '~/server/application/usecases/findUserByLineId';
import { dayjs } from '~/utils/dayjs';

const now = dayjs('2023-09-03T11:13:00.000Z').tz();

const context = {
  repositories: {
    user: {
      getOne: async (_lineId: string): Promise<UserEntity> => {
        const user = UserEntity.create({
          id: '001',
          lineId: 'line_001',
          ableToReceiveMessage: true,
          approveUpdateTermsAt: now.toISOString(),
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        });
        return user;
      },
    },
  },
} as unknown as Context;

const findUserByLineId = FindUserByLineIdUsecase.create(context);

describe('FindUserByLineIdUsecase', () => {
  test('FindUserByLineIdUsecase が実行できる', async () => {
    const result = await findUserByLineId.invoke('line_001');

    expect(result.dto).toEqual({
      id: '001',
      lineId: 'line_001',
      ableToReceiveMessage: true,
      approveUpdateTermsAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  });
});
