import type { NextApiRequest, NextApiResponse } from 'next';
import type { ErrorResult } from '~/types/api';

export namespace CustomNextApi {
  export type Request<
    T extends {
      query: unknown;
      request?: unknown;
    } = {
      query: unknown;
      request?: unknown;
    }
  > = Omit<NextApiRequest, 'body' | 'query'> & {
    query: Partial<T['query']>;
    body?: Partial<T['request']>;
    ipAddress?: string;
    authorization?: {
      userId: string;
    };
  };

  export type Response<
    T extends {
      response: unknown;
    } = {
      response: unknown;
    }
  > = NextApiResponse<T['response'] | ErrorResult>;

  export type Handler<
    T extends {
      query: unknown;
      response: unknown;
      request?: unknown;
    }
  > = (req: Request<T>, res: Response<T>) => void | Promise<void>;
}
