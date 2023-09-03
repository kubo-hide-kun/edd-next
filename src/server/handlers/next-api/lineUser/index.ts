import { Api } from '~/server/handlers/next-api';

export const PATH = '' as const;
const INDIVIDUAL_PATH = '/api/user/line/[lineId]' as const;

export class UserApi extends Api<typeof PATH, typeof INDIVIDUAL_PATH> {
  constructor() {
    super('UserApi', PATH, INDIVIDUAL_PATH);
  }
}

const userApi = new UserApi();

console.log('userApi', userApi.individualConnectHandlers);

userApi.individualConnectHandlers.get = async (request, response) => {
  const { lineId } = request.query;
  if (!lineId) {
    response.status(400).json({
      httpStatus: 400,
      message: 'Bad Request',
    });
    return;
  }

  userApi.init({
    ipAddress: request.ipAddress,
    authorization: request.authorization,
  });

  const { findUserByLineIdUsecase } = userApi.application.usecases;
  const found = await findUserByLineIdUsecase.invoke(lineId);

  response.status(200).json({
    user: found.nonSensitiveDto,
  });
};

const connect = userApi.createConnect();
const individualConnect = userApi.createIndividualConnect();

export { connect, individualConnect };
