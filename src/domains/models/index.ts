export abstract class Entity<Dto> {
  /**
   * @description
   * このプロパティは、エンティティのDTOを取得するためのプロパティです。
   */
  abstract get dto(): Dto;

  /**
   * @description
   * このプロパティは、個人情報などの機密情報を含まないエンティティのDTOを取得するためのプロパティです。
   */
  abstract get nonSensitiveDto(): Dto;
}

export abstract class ValueObject<Dto> {
  /**
   * @description
   * このプロパティは、値オブジェクトのDTOを取得するためのプロパティです。
   */
  abstract get dto(): Dto;
}
