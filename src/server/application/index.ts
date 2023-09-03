import { Context } from '~/server/application/context';

export class Application {
  private context: Context;

  constructor(...params: Parameters<typeof Context.create>) {
    this.context = Context.create(...params);
  }

  get usecases() {
    return this.context.usecases;
  }
}
