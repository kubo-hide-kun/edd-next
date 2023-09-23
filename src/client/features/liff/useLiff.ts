import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export type LiffUser = {
  isLoggedIn: boolean;
  userId: string;
  idToken: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

interface UseLiff {
  liffUser: LiffUser | null;
  initialize: () => Promise<void>;
  login: () => void;
  logout: () => void;
  closeWindow: () => void;
}

export const liffUserState = atom<LiffUser>({
  key: 'liffUserState',
  default: {
    isLoggedIn: false,
    userId: '',
    idToken: '',
    displayName: '',
  },
});

export const useLiff = (
  initConfig: Parameters<typeof liff.init>[0]
): UseLiff => {
  const [liffUser, setLiffUser] = useRecoilState(liffUserState);
  const initialize = useCallback(async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        liff.use(new LiffMockPlugin());
        await liff.init({ liffId: initConfig.liffId, mock: true } as Parameters<
          typeof liff.init
        >[0]);
        liff.login();
      } else {
        await liff.init({ liffId: initConfig.liffId });
      }
      const profile = await liff.getProfile();
      setLiffUser({
        isLoggedIn: true,
        userId: profile.userId,
        idToken: liff.getIDToken(),
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      setLiffUser({
        isLoggedIn: false,
        userId: '',
        idToken: '',
        displayName: '',
      });
    }
  }, [initConfig, setLiffUser]);

  const login = () => {
    liff.login();
  };

  const logout = () => {
    liff.logout();
    setLiffUser(null);
  };

  const closeWindow = () => {
    liff.closeWindow();
  };

  return {
    liffUser,
    initialize,
    login,
    logout,
    closeWindow,
  };
};
