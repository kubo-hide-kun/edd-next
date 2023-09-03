import { Context } from '~/server/application/context';

export class Repository {
  constructor(protected name: string, protected context: Readonly<Context>) {}

  protected throwError(message: string, referenceInfo?: unknown): never {
    const error = new Error(
      JSON.stringify({
        where: `repository.${this.name}`,
        message,
        referenceInfo,
      })
    );
    throw error;
  }
}
