import { Liff } from '@line/liff/exports';

export class LiffUser {
  isLoggedIn: boolean = false;
  userId: string = '';
  idToken: string = '';
  displayName: string = '';
  pictureUrl?: string = undefined;
  statusMessage?: string = undefined;

  constructor(
    private readonly _liff: Liff,
    private readonly _config: Parameters<Liff['init']>[0]
  ) {}

  static async create(...args: ConstructorParameters<typeof LiffUser>) {
    const instance = new LiffUser(...args);
    await instance._init();
    return instance;
  }

  private async _init() {
    await this._liff.init(
      { ...this._config },
      async () => {
        this.isLoggedIn = this._liff.isLoggedIn();
        this.idToken = this._liff.getIDToken();

        const profile = await this._liff.getProfile();
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
