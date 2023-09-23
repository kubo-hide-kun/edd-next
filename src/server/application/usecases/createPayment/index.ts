import { HistoryEntity } from '~/domains/models/History';
import { Usecase } from '~/server/application/usecases';

export namespace CreatePaymentUsecase {
  export const create: Usecase.Creator<HistoryEntity, HistoryEntity.Dto> = (
    context
  ) => {
    const { history: historyRepository } = context.repositories;

    const usecase = Usecase.create<HistoryEntity, HistoryEntity.Dto>(
      'createPayment',
      false,
      async (params) => {
        const history = await historyRepository.create(params);
        if (!history) {
          Usecase.throwException('history create error', { params });
        }

        // TODO: グループ内でレスポンスとして，集計を返す

        return history;
      }
    );

    return usecase;
  };
}
