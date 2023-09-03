import { Api } from '~/server/handlers/next-api';

export const PATH = '' as const;
const INDIVIDUAL_PATH = '/api/user/line/[lineId]' as const;

export class LineUserApi extends Api<typeof PATH, typeof INDIVIDUAL_PATH> {
  constructor() {
    super('UserApi', PATH, INDIVIDUAL_PATH);
  }
}

const lineUserApi = new LineUserApi();

lineUserApi.individualConnectHandlers.get = async (request, response) => {
  const { lineId } = request.query;
  if (!lineId) {
    response.status(400).json({
      httpStatus: 400,
      message: 'Bad Request',
    });
    return;
  }

  lineUserApi.init({
    ipAddress: request.ipAddress,
    authorization: request.authorization,
  });

  const { findUserByLineIdUsecase } = lineUserApi.application.usecases;
  const found = await findUserByLineIdUsecase.invoke(lineId);

  response.status(200).json({
    user: found.nonSensitiveDto,
  });
};

const connect = lineUserApi.createConnect();
const individualConnect = lineUserApi.createIndividualConnect();

export { connect, individualConnect };
