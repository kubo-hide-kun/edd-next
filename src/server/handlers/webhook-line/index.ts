import { WebhookRequestBody, middleware } from '@line/bot-sdk';
import { Middleware } from '@line/bot-sdk/lib/middleware';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const runMiddleware = (
  request: NextApiRequest,
  response: NextApiResponse,
  middleware: Middleware
) => {
  return new Promise<void>((resolve, reject) => {
    middleware(request, response, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const _isWebhookRequestBody = (body: unknown): body is WebhookRequestBody => {
  if (typeof body !== 'object' || body === null) return false;
  if (!Array.isArray(body['events'])) {
    return false;
  }
  return true;
};

export const lineWebhookHandler: NextApiHandler = async (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).end();
    return;
  }

  const body = request.body;
  if (!_isWebhookRequestBody(body)) {
    response.status(400).end();
    return;
  }

  const _middleware = middleware({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
    channelSecret: process.env.LINE_CHANNEL_SECRET!,
  });

  await runMiddleware(request, response, _middleware);

  await Promise.all([]);
};
