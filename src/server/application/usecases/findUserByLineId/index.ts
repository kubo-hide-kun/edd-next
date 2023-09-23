import { UserEntity } from '~/domains/models/User';
import { Usecase } from '~/server/application/usecases';

export namespace FindUserByLineIdUsecase {
  export const create: Usecase.Creator<UserEntity, string> = (context) => {
    const { user: userRepository } = context.repositories;

    const usecase = Usecase.create<UserEntity, string>(
      'findUserByLineId',
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
