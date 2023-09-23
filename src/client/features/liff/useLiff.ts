import liff from '@line/liff';
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

export const liffUserState = atom<LiffUser | null>({
  key: 'liffUserState',
  default: null,
});

export const useLiff = (
  initConfig: Parameters<typeof liff.init>[0]
): UseLiff => {
  const [liffUser, setLiffUser] = useRecoilState(liffUserState);

  const initialize = useCallback(async () => {
    try {
      await liff.init(initConfig);
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setLiffUser({
          isLoggedIn: true,
          userId: profile.userId,
          idToken: liff.getIDToken(),
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          statusMessage: profile.statusMessage,
        });
      } else {
        setLiffUser({
          isLoggedIn: false,
          userId: '',
          idToken: '',
          displayName: '',
        });
      }
    } catch (error) {
      setLiffUser(null);
      // eslint-disable-next-line no-console
      console.error(error);
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
