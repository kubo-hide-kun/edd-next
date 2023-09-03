import { Context } from '~/server/application/context';
import { UserRepository } from '~/server/application/repositories/user';

export const build = (context: Readonly<Context>) => {
  return {
    user: UserRepository.create(context),
  };
};
