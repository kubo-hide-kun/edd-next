import { Context } from '~/server/application/context';
import { CreatePaymentUsecase } from '~/server/application/usecases/createPayment';
import { FindPaymentByGroupIdUsecase } from '~/server/application/usecases/findPaymentByGroupId';
import { FindPayhmentByLineUidUsecase } from '~/server/application/usecases/findPaymentByLineUid';
import { FindUserByLineUidUsecase } from '~/server/application/usecases/findUserByLineUid';

export const build = (context: Readonly<Context>) => {
  return {
    findUserByLineUidUsecase: FindUserByLineUidUsecase.create(context),
    findPaymentByLineUidUsecase: FindPayhmentByLineUidUsecase.create(context),
    createPaymentUsecase: CreatePaymentUsecase.create(context),
    findPaymentByGroupIdUsecase: FindPaymentByGroupIdUsecase.create(context),
  };
};
