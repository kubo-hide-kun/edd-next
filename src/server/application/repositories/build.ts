import { Context } from '~/server/application/context';
import { HistoryRepository } from '~/server/application/repositories/history';
import { UserRepository } from '~/server/application/repositories/user';

export const build = (context: Readonly<Context>) => {
  return {
    user: UserRepository.create(context),
    history: HistoryRepository.create(context),
  };
};
