import { Context } from '~/server/application/context';

export class Usecase<OutPutData, InputData = undefined> {
  constructor(
    private name: string,
    private isIncludePrivacyData: boolean,
    private readonly __invoke: InputData extends undefined
      ? () => Promise<OutPutData>
      : (payload: InputData) => Promise<OutPutData>,
    private readonly __logger?: { error: (...args: unknown[]) => void }
  ) {}

  /**
   * @description
   * このメソッドは、usecaseを生成するためのファクトリメソッドです。
   */
  static create<OutPutData, InputData = undefined>(
    ...params: ConstructorParameters<typeof Usecase<OutPutData, InputData>>
  ) {
    return new Usecase<OutPutData, InputData>(...params);
  }

  /**
   * @description
   * このメソッドは、usecase内でエラーを発生させるためのメソッドです。
   */
  static throwException(message: string, referenceInfo?: unknown): never {
    const error = new Error(
      JSON.stringify({
        message,
        referenceInfo,
      })
    );
    throw error;
  }

  public async invoke(inputData: InputData): Promise<OutPutData> {
    try {
      return await this.__invoke(inputData);
    } catch (error) {
      this.__logger.error(
        JSON.stringify({
          error,
          where: `usecase.${this.name}`,
          inputData: this.isIncludePrivacyData
            ? 'display personal information is disabled'
            : inputData,
        })
      );
      throw error;
    }
  }
}

export namespace Usecase {
  export type Creator<OutPutData, InputData = undefined> = (
    context: Readonly<Context>
  ) => Usecase<OutPutData, InputData>;
}
