import { Context } from '~/server/application/context';
import { FindUserByLineIdUsecase } from '~/server/application/usecases/findUserByLineId';

export const build = (context: Readonly<Context>) => {
  return {
    findUserByLineIdUsecase: FindUserByLineIdUsecase.create(context),
  };
};
