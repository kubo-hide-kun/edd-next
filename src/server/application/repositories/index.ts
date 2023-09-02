import { Context } from '~/server/application/context';

export class Repository {
  constructor(protected name: string, protected context: Readonly<Context>) {}

  static create(
    ...params: ConstructorParameters<typeof Repository>
  ): Repository {
    const repository = new Repository(...params);
    return repository;
  }

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

export namespace Repository {
  export type Builder = (context: Readonly<Context>) => Repository;

  export const build = (_context: Readonly<Context>) => {
    return {};
  };
}