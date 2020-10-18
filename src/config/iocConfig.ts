/* eslint-disable max-len */
import 'reflect-metadata';
import {Container} from 'inversify';
import SERVICE_IDENTIFIERS from '../data/models/constants/identifiers';
import InMemoryDataStore from '../data/inMemoryDataStore';
import Repository from '../data/repository';
import {
  GetDinosaurInfoRequest,
  GetDinosaurInfoResponse,
  GetDinosaurInfoHandler,
  CreateDinosaurRequest,
  CreateDinosaurHandler,
  RequestHandler,
  BasicRequestHandler,
  FeedDinosaurHandler,
  KillDinosaurRequest,
  KillDinosaurHandler,
  PlayWithDinosaurRequest,
  PlayWithDinosaurHandler,
  WaterDinosaurRequest,
  WaterDinosaurHandler,
  FeedDinosaurRequest,
  ClearDinosaurAndWasteRequest,
  ClearDinosaurAndWasteHandler,
  ClearWasteRequest,
  ClearWasteHandler,
  GetEnvironmentStatusRequest,
  GetEnvironmentStatusResponse,
  GetEnvironmentStatusHandler,
} from '../services/index';

const container = new Container();
container
    .bind<Repository>(SERVICE_IDENTIFIERS.REPOSITORY)
    .to(InMemoryDataStore)
    .inSingletonScope();

container
    .bind<RequestHandler<GetDinosaurInfoRequest, GetDinosaurInfoResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_INFO_HANDLER)
    .to(GetDinosaurInfoHandler);

container
    .bind<RequestHandler<GetEnvironmentStatusRequest, GetEnvironmentStatusResponse>>(SERVICE_IDENTIFIERS.GET_ENVIRONMENT_STATUS_HANDLER)
    .to(GetEnvironmentStatusHandler);

container
    .bind<BasicRequestHandler<CreateDinosaurRequest>>(SERVICE_IDENTIFIERS.CREATE_DINOSAUR_HANDLER)
    .to(CreateDinosaurHandler);

container
    .bind<BasicRequestHandler<FeedDinosaurRequest>>(SERVICE_IDENTIFIERS.FEED_DINOSAUR_HANDLER)
    .to(FeedDinosaurHandler);

container
    .bind<BasicRequestHandler<KillDinosaurRequest>>(SERVICE_IDENTIFIERS.KILL_DINOSAUR_HANDLER)
    .to(KillDinosaurHandler);

container
    .bind<BasicRequestHandler<PlayWithDinosaurRequest>>(SERVICE_IDENTIFIERS.PLAY_WITH_DINOSAUR_HANDLER)
    .to(PlayWithDinosaurHandler);

container
    .bind<BasicRequestHandler<WaterDinosaurRequest>>(SERVICE_IDENTIFIERS.WATER_DINOSAUR_HANDLER)
    .to(WaterDinosaurHandler);

container
    .bind<BasicRequestHandler<ClearDinosaurAndWasteRequest>>(SERVICE_IDENTIFIERS.CLEAR_DINOSAUR_AND_WASTER_HANDLER)
    .to(ClearDinosaurAndWasteHandler);

container
    .bind<BasicRequestHandler<ClearWasteRequest>>(SERVICE_IDENTIFIERS.CLEAR_WASTE_HANDLER)
    .to(ClearWasteHandler);

export default container;
