import liff from '@line/liff';
import { Liff } from '@line/liff/exports';
import { LiffMockPlugin } from '@line/liff-mock';

liff.use(new LiffMockPlugin());

export class LiffUser {
  private readonly _liff: Liff;
  private readonly _config: Parameters<Liff['init']>[0];
  isLoggedIn: boolean = false;
  userId: string = '';
  idToken: string = '';
  displayName: string = '';
  pictureUrl?: string = undefined;
  statusMessage?: string = undefined;

  constructor(liff: Liff, config: Parameters<Liff['init']>[0]) {
    this._liff = liff;
    this._config = config;
  }

  static async create(...args: ConstructorParameters<typeof LiffUser>) {
    const instance = new LiffUser(...args);
    await instance._init();
    return instance;
  }

  private async _init() {
    await this._liff.init(
      this._config,
      async () => {
        this.isLoggedIn = liff.isLoggedIn();
        this.idToken = liff.getIDToken();

        const profile = await liff.getProfile();
        this.userId = profile.userId;
        this.displayName = profile.displayName;
        this.pictureUrl = profile.pictureUrl;
        this.statusMessage = profile.statusMessage;
      },
      (error) => {
        throw error;
      }
    );
  }

  login() {
    this._liff.login();
  }

  logout() {
    this._liff.logout();
  }

  closeWindow() {
    this._liff.closeWindow();
  }
}
