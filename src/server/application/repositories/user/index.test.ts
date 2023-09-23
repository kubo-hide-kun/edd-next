import { describe, test, expect } from '@jest/globals';
import { Profile as LineUserProfile } from '@line/bot-sdk';
import { User as PrismaUser } from '@prisma-generated';
import { Context } from '~/server/application/context';
import { UserRepository } from '~/server/application/repositories/user';
import { dayjs } from '~/utils/dayjs';

const now = dayjs('2023-09-03T11:13:00.000Z').tz();

const context = {
  infrastructures: {
    lineBot: {
      client: {
        getProfile: async (_lineUid: string): Promise<LineUserProfile> => {
          return {
            displayName: 'displayName',
            userId: 'line_001',
            pictureUrl: 'pictureUrl',
            statusMessage: 'statusMessage',
          };
        },
      },
    },
    prisma: {
      client: {
        user: {
          findUnique: async (_conditions: unknown): Promise<PrismaUser> => {
            return {
              id: '001',
              lineUid: 'line_001',
              ableToReceiveMessage: false,
              approveUpdateTermsAt: now.toDate(),
              createdAt: now.toDate(),
              updatedAt: now.toDate(),
            };
          },
        },
      },
    },
  },
} as unknown as Context;

const userRepository = UserRepository.create(context);

describe('UserRepository', () => {
  test('ユーザーID で getOne が実行できる', async () => {
    const result = await userRepository.getOne({
      id: '001',
    });

    expect(result.dto).toEqual({
      id: '001',
      lineUid: 'line_001',
      lineDisplayName: 'displayName',
      ableToReceiveMessage: false,
      approveUpdateTermsAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  });
  test('LineUID で getOne が実行できる', async () => {
    const result = await userRepository.getOne({
      lineUid: 'line_001',
    });

    expect(result.dto).toEqual({
      id: '001',
      lineUid: 'line_001',
      lineDisplayName: 'displayName',
      ableToReceiveMessage: false,
      approveUpdateTermsAt: now.toISOString(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  });
});
