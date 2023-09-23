import { Api } from '~/server/handlers/next-api';

export const PATH = '' as const;
const INDIVIDUAL_PATH = '/api/user/line/[lineUid]' as const;

export class LineUserApi extends Api<typeof PATH, typeof INDIVIDUAL_PATH> {
  constructor() {
    super('UserApi', PATH, INDIVIDUAL_PATH);
  }
}

const lineUserApi = new LineUserApi();

lineUserApi.individualConnectHandlers.get = async (request, response) => {
  const { lineUid } = request.query;
  if (!lineUid) {
    response.status(400).json({
      httpStatus: 400,
      message: 'Bad Request',
    });
    return;
  }

  const { findUserByLineUidUsecase } = lineUserApi.application.usecases;
  const found = await findUserByLineUidUsecase.invoke(lineUid);

  response.status(200).json({
    user: found.nonSensitiveDto,
  });
};

const connect = lineUserApi.createConnect();
const individualConnect = lineUserApi.createIndividualConnect();

export { connect, individualConnect };
