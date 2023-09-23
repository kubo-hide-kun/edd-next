import { HistoryEntity } from '~/domains/models/History';
import { Usecase } from '~/server/application/usecases';

export namespace FindHistoryByIdUsecase {
  export const create: Usecase.Creator<HistoryEntity, string> = (context) => {
    const { history: historyRepository } = context.repositories;

    const usecase = Usecase.create<HistoryEntity, string>(
      'findHistoryById',
      false,
      async (id) => {
        const history = await historyRepository.getOne({ id });
        if (!history) {
          Usecase.throwException('history not found', { id });
        }
        return history;
      }
    );

    return usecase;
  };
}
