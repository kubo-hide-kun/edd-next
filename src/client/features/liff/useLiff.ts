import liff from '@line/liff';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { LiffUser } from '~/client/features/liff';

export const liffUserState = atom<LiffUser | null>({
  key: 'liffUserState',
  default: null,
});

export const useLiff = (initConfig: Parameters<typeof liff.init>[0]) => {
  const [liffUser, setLiffUser] = useRecoilState(liffUserState);

  const initialize = useCallback(async () => {
    const liffUser = await LiffUser.create(liff, initConfig);
    setLiffUser(liffUser);
  }, [initConfig, setLiffUser]);

  return {
    liffUser,
    initialize,
  };
};
