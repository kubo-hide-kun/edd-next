import { User } from '~/schemas/entities/User';
import { Usecase } from '~/server/application/usecases';

export namespace FindUserByLineIdUsecase {
  export const create: Usecase.Creator<User, string> = (context) => {
    const { user: userRepository } = context.repositories;

    const usecase = Usecase.create<User, string>(
      'FindUserByLineId',
      false,
      async (lineId) => {
        const user = await userRepository.getOne({ lineId });
        if (!user) {
          Usecase.throwException('user not found', { lineId });
        }
        return user;
      }
    );

    return usecase;
  };
}
