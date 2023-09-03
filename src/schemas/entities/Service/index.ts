import { Entity } from '~/schemas/entities';

export class Service extends Entity<Service.Dto> {
  name: string;
  nameSuffix: string;
  description: string;
  url: string;
  themeColor: string;

  constructor(dto: Service.Dto) {
    super();
    this.name = dto.name;
    this.nameSuffix = dto.nameSuffix;
    this.description = dto.description;
    this.url = dto.url;
    this.themeColor = dto.themeColor;
  }

  static create(...params: ConstructorParameters<typeof Service>) {
    const entity = new Service(...params);
    return entity;
  }

  public get dto(): Service.Dto {
    return {
      name: this.name,
      nameSuffix: this.nameSuffix,
      description: this.description,
      url: this.url,
      themeColor: this.themeColor,
    };
  }

  public get nonSensitiveDto(): Service.Dto {
    return this.dto;
  }

  public get ogpImageUrl(): string {
    return `${this.url}/ogp.png`;
  }
}

export namespace Service {
  export type Dto = {
    name: string;
    nameSuffix: string;
    description: string;
    url: string;
    themeColor: string;
  };

  /**
   * TODO: サービス名に合わせて変更する
   */
  export const APP = Service.create({
    name: 'サービス名',
    nameSuffix: '補足',
    description: 'サービスの説明',
    url: 'https://example.com',
    themeColor: '#000000',
  });
}
