import { MessageEvent } from '@line/bot-sdk';
import { Usecase } from '~/server/application/usecases';

type Input = {
  event: MessageEvent;
};

type Output = unknown;

export namespace HandleLineMessageEventUsecase {
  export const create: Usecase.Creator<Output, Input> = (_context) => {
    const usecase = Usecase.create<Output, Input>(
      'handleLineMessageEvent',
      false,
      async () => {
        return {};
      }
    );

    return usecase;
  };
}
