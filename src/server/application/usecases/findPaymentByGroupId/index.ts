import { HistoryEntity } from '~/domains/models/History';
import { Usecase } from '~/server/application/usecases';

export namespace FindPaymentByGroupIdUsecase {
  export const create: Usecase.Creator<HistoryEntity[], string> = (context) => {
    const { history: historyRepository } = context.repositories;

    const usecase = Usecase.create<HistoryEntity[], string>(
      'findPaymentByGroupId',
      false,
      async (lineGroupId) => {
        const history = await historyRepository.getByGroupId({
          lineGroupId,
        });
        if (!history) {
          Usecase.throwException('history not found', { lineGroupId });
        }
        return history;
      }
    );

    return usecase;
  };
}
