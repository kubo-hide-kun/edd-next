import { WebhookRequestBody, middleware } from '@line/bot-sdk';
import { Middleware } from '@line/bot-sdk/lib/middleware';
import { NextApiHandler } from 'next';
import { Application } from '~/server/application';

class lineWebhookApi {
  private _middleware: Middleware;

  constructor() {
    this._middleware = middleware({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
      channelSecret: process.env.LINE_CHANNEL_SECRET!,
    });
  }

  /**
   * @description LINEのWebhook APIのエントリーポイントです。
   */
  public handler: NextApiHandler = async (request, response) => {
    if (request.method !== 'POST') {
      response.status(405).end();
      return;
    }

    const body = request.body;
    if (!this._isWebhookRequestBody(body)) {
      response.status(400).end();
      return;
    }

    await this._runMiddleware(request, response);

    const application = new Application({
      ipAddress: 'anonymous',
    });

    const tasks = this._createTasksByEvents(body.events, application);

    await Promise.all(tasks);
  };

  /**
   * @description LINEのWebhook APIのリクエストボディが正しいかどうかを判定するためのメソッドです。
   */
  private _isWebhookRequestBody(body: unknown): body is WebhookRequestBody {
    if (typeof body !== 'object' || body === null) return false;
    if (!Array.isArray(body['events'])) {
      return false;
    }
    return true;
  }

  /**
   * @description LINEのWebhook APIのミドルウェアを実行するためのメソッドです。
   */
  private _runMiddleware: NextApiHandler = (request, response) => {
    return new Promise<void>((resolve, reject) => {
      this._middleware(request, response, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  /**
   * @description LINEのWebhook APIのイベントから、タスクを生成するためのメソッドです。
   */
  private _createTasksByEvents(
    events: WebhookRequestBody['events'],
    application: Application
  ) {
    const { handleLineMessageEvent } = application.usecases;
    return events.map((event) => {
      switch (event.type) {
        case 'message':
          return handleLineMessageEvent.invoke({
            event,
          });
      }
    });
  }
}

export const handler = new lineWebhookApi().handler;
