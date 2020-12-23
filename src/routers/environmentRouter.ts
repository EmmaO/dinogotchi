import express from 'express'
import container from '../config/iocConfig';
import SERVICE_IDENTIFIERS from '../data/models/constants/identifiers';
import {
  BasicRequestHandler,
  RequestHandler,
  GetEnvironmentStatusRequest,
  ClearDinosaurAndWasteRequest,
  ClearWasteRequest,
} from '../services';

// eslint-disable-next-line new-cap
const router = express.Router();

// Get environment status route
router.get('/status', (req, res) => {
  const getEnvironmentStatusHandler = container.get<RequestHandler<GetEnvironmentStatusRequest, GetEnvironmentStatusRequest>>(SERVICE_IDENTIFIERS.GET_ENVIRONMENT_STATUS_HANDLER);
  const handlerResponse = getEnvironmentStatusHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? handlerResponse.successResponse : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

// Clear waste route
router.post('/clearWaste', (req, res) => {
  const clearWasteHandler = container.get<BasicRequestHandler<ClearWasteRequest>>(SERVICE_IDENTIFIERS.CLEAR_WASTE_HANDLER);
  const handlerResponse = clearWasteHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

// Clear dinosaur and waste route
router.post('/clearDinosaurAndWaste', (req, res) => {
  const clearDinosaurAndWasteHandler = container.get<BasicRequestHandler<ClearDinosaurAndWasteRequest>>(SERVICE_IDENTIFIERS.CLEAR_DINOSAUR_AND_WASTER_HANDLER);
  const handlerResponse = clearDinosaurAndWasteHandler.handleRequest({});
  const response = handlerResponse.statusCode < 300 ? {} : handlerResponse.errors;

  res.status(handlerResponse.statusCode).json(response);
});

export default router;
