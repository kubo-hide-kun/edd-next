import { Context } from '~/server/application/context';
import { FindUserByLineUidUsecase } from '~/server/application/usecases/findUserByLineUid';
import { HandleLineMessageEventUsecase } from '~/server/application/usecases/handleLineMessageEvent';

export const build = (context: Readonly<Context>) => {
  return {
    findUserByLineUidUsecase: FindUserByLineUidUsecase.create(context),
    handleLineMessageEvent: HandleLineMessageEventUsecase.create(context),
  };
};
