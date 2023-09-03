import { Context } from '~/server/application/context';
import { FindUserByLineIdUsecase } from '~/server/application/usecases/findUserByLineId';

export class Usecase<OutPutData, InputData = undefined> {
  constructor(
    private name: string,
    private isIncludePrivacyData: boolean,
    private readonly __invoke: InputData extends undefined
      ? () => Promise<OutPutData>
      : (payload: InputData) => Promise<OutPutData>,
    private readonly __logger?: { error: (...args: unknown[]) => void }
  ) {}

  static create<OutPutData, InputData = undefined>(
    ...params: ConstructorParameters<typeof Usecase<OutPutData, InputData>>
  ) {
    return new Usecase<OutPutData, InputData>(...params);
  }

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

  export const build = (context: Readonly<Context>) => {
    return {
      findUserByLineIdUsecase: FindUserByLineIdUsecase.create(context),
    };
  };
}
