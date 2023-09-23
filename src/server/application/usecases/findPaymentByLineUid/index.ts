import { OptimizeService, Payment } from '~/domains/services/optimizeService';
import { Usecase } from '~/server/application/usecases';

export namespace FindPayhmentByLineUidUsecase {
  export const create: Usecase.Creator<Payment[], string> = (context) => {
    const { user: userRepository, history: historyRepository } =
      context.repositories;

    const usecase = Usecase.create<Payment[], string>(
      'findUserByLineUid',
      false,
      async (lineUid) => {
        const user = await userRepository.getOne({ lineUid });
        if (!user) {
          Usecase.throwException('user not found', { lineUid });
        }

        const histories = await historyRepository.getAllByUserId(user.id);
        if (!histories) {
          Usecase.throwException('history not found', user);
        }

        return OptimizeService.optimize(histories);
      }
    );

    return usecase;
  };
}
