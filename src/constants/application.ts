class Application {
  constructor(
    public readonly name: string,
    public readonly nameSuffix: string,
    public readonly description: string,
    public readonly url: string,
    public readonly themeColor: string
  ) {}

  public get ogpImageUrl(): string {
    return `${this.url}/ogp.png`;
  }
}

export const application = new Application(
  'サービス名',
  '補足',
  'サービスの説明',
  'https://example.com',
  '#000000'
);
