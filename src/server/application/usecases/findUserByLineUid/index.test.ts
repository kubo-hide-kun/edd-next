import { describe, test, expect } from '@jest/globals';
import { UserEntity } from '~/domains/models/User';
import { Context } from '~/server/application/context';
import { FindUserByLineUidUsecase } from '~/server/application/usecases/findUserByLineUid';
import { dayjs } from '~/utils/dayjs';

const now = dayjs('2023-09-03T11:13:00.000Z').tz();

const context = {
  repositories: {
    user: {
      getOne: async (_lineUid: string): Promise<UserEntity> => {
        const user = UserEntity.create({
          id: '001',
          lineUid: 'line_001',
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

const findUserByLineUid = FindUserByLineUidUsecase.create(context);

describe('FindUserByLineUidUsecase', () => {
  test('FindUserByLineUidUsecase が実行できる', async () => {
    const result = await findUserByLineUid.invoke('line_001');

    expect(result.dto).toEqual({
      id: '001',
      lineUid: 'line_001',
      ableToReceiveMessage: true,
      approveUpdateTermsAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  });
});
