import container from './config/iocConfig';
import SERVICE_IDENTIFIER from './data/models/constants/identifiers';
import {
  BasicRequestHandler,
  RequestHandler,
  CreateDinosaurRequest,
  GetDinosaurInfoRequest,
  GetDinosaurInfoResponse,
  GetDinosaurStatusRequest,
  GetDinosaurStatusResponse,
  GetEnvironmentStatusRequest,
} from './services';
import SERVICE_IDENTIFIERS from './data/models/constants/identifiers';

const createDinosaurHandler = container.get<BasicRequestHandler<CreateDinosaurRequest>>(SERVICE_IDENTIFIER.CREATE_DINOSAUR_HANDLER);
const getDinosaurInfoHandler = container.get<RequestHandler<GetDinosaurInfoRequest, GetDinosaurInfoResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_INFO_HANDLER);
const getDinosaurStatusHandler = container.get<RequestHandler<GetDinosaurStatusRequest, GetDinosaurStatusResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_STATUS_HANDLER);
const getEnvironmentStatusHandler = container.get<RequestHandler<GetEnvironmentStatusRequest, GetEnvironmentStatusRequest>>(SERVICE_IDENTIFIERS.GET_ENVIRONMENT_STATUS_HANDLER);

const createRes1 = createDinosaurHandler.handleRequest({
  name: 'Bill',
});

const createRes2 = createDinosaurHandler.handleRequest({
  name: 'Ash',
});

const getRes = getDinosaurInfoHandler.handleRequest({});

const getStatusRes = getDinosaurStatusHandler.handleRequest({});

console.log('Request 1:');
console.log(`Response: ${createRes1.statusCode.toString()}`);
console.log();
console.log('Request 2:');
console.log(`Response: ${createRes2.statusCode.toString()}`);
console.log();
console.log('Get result:');
console.log(`Name: ${getRes.successResponse.dinosaur.name}, Age: ${getRes.successResponse.dinosaur.age}`);
console.log(`Status: ${getStatusRes.successResponse.status}`);

console.log(getEnvironmentStatusHandler.handleRequest({}).successResponse);
