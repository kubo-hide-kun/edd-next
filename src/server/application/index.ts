import { Context } from '~/server/application/context';

export class Application {
  private _context: Context;

  constructor(...params: Parameters<typeof Context.create>) {
    this._context = Context.create(...params);
  }

  get uscases() {
    return this._context;
  }
}
