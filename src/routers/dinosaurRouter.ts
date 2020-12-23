import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import container from '../config/iocConfig';
import SERVICE_IDENTIFIERS from '../data/models/constants/identifiers';
import {
  BasicRequestHandler,
  CreateDinosaurRequest,
  FeedDinosaurRequest,
  GetDinosaurInfoRequest,
  GetDinosaurInfoResponse,
  GetDinosaurStatusRequest,
  GetDinosaurStatusResponse,
  KillDinosaurRequest,
  PlayWithDinosaurRequest,
  RequestHandler,
  WaterDinosaurRequest,
} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  const getDinosaurInfoHandler = container.get<RequestHandler<GetDinosaurInfoRequest, GetDinosaurInfoResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_INFO_HANDLER);
  const handlerResponse = getDinosaurInfoHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? handlerResponse.successResponse : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.get('/status', (req, res) => {
  const getDinosaurStatusHandler = container.get<RequestHandler<GetDinosaurStatusRequest, GetDinosaurStatusResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_STATUS_HANDLER);
  const handlerResponse = getDinosaurStatusHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? handlerResponse.successResponse : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.post('/', [
  body('name').exists().withMessage('name is required'),
],
(req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()[0].msg});
  }

  const createDinosaurHandler = container.get<BasicRequestHandler<CreateDinosaurRequest>>(SERVICE_IDENTIFIERS.CREATE_DINOSAUR_HANDLER);
  const handlerResponse = createDinosaurHandler.handleRequest(req.body as CreateDinosaurRequest);
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.post('/kill', (req, res) => {
  const killDinosaurHandler = container.get<BasicRequestHandler<KillDinosaurRequest>>(SERVICE_IDENTIFIERS.KILL_DINOSAUR_HANDLER);
  const handlerResponse = killDinosaurHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.post('/feed', (req, res) => {
  const feedDinosaurHandler = container.get<BasicRequestHandler<FeedDinosaurRequest>>(SERVICE_IDENTIFIERS.FEED_DINOSAUR_HANDLER);
  const handlerResponse = feedDinosaurHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.post('/play', (req, res) => {
  const playWithDinosaurHandler = container.get<BasicRequestHandler<PlayWithDinosaurRequest>>(SERVICE_IDENTIFIERS.PLAY_WITH_DINOSAUR_HANDLER);
  const handlerResponse = playWithDinosaurHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

router.post('/water', (req, res) => {
  const waterDinosaurHandler = container.get<BasicRequestHandler<WaterDinosaurRequest>>(SERVICE_IDENTIFIERS.WATER_DINOSAUR_HANDLER);
  const handlerResponse = waterDinosaurHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

export default router;
