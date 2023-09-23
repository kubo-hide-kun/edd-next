import { UserEntity } from '~/domains/models/User';
import { Usecase } from '~/server/application/usecases';

export namespace FindUserByLineUidUsecase {
  export const create: Usecase.Creator<UserEntity, string> = (context) => {
    const { user: userRepository } = context.repositories;

    const usecase = Usecase.create<UserEntity, string>(
      'findUserByLineUid',
      false,
      async (lineUid) => {
        const user = await userRepository.getOne({ lineUid });
        if (!user) {
          Usecase.throwException('user not found', { lineUid: lineUid });
        }
        return user;
      }
    );

    return usecase;
  };
}
