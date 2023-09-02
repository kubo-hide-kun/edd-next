import { Api } from '~/server/handlers/next-api';

const PATH = '/api/user' as const;
const INDIVIDUAL_PATH = '/api/user/[userId]' as const;

export class UserApi extends Api<typeof PATH, typeof INDIVIDUAL_PATH> {
  constructor() {
    super('UserApi', PATH, INDIVIDUAL_PATH);
  }
}

const userApi = new UserApi();

userApi.connectHandlers.get = async (request, response) => {
  userApi.init({
    ipAddress: request.ipAddress,
    authorization: request.authorization,
  });
  response.status(200).json({
    status: 'ok',
  });
};

const connect = userApi.createConnect();
const individualConnect = userApi.createIndividualConnect();

export { connect, individualConnect };
