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
  GetDinosaurStatusRequest,
  GetDinosaurStatusResponse,
  GetDinosaurStatusHandler,
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
  IncrementTimeBasedEventsRequest,
  IncrementTimeBasedEventsHandler,
} from '../services/index';
import DinosaurDeathChecker from '../services/generic/dinosaurInteractionHandler/dinosaurDeathChecker';
import FullDinosaurDeathChecker from '../services/generic/dinosaurInteractionHandler/fullDinosaurDeathChecker';
import DinosaurDeathUpdater from '../services/generic/dinosaurInteractionHandler/dinosaurDeathUpdater';
import SingleDinosaurDeathUpdater from '../services/generic/dinosaurInteractionHandler/singleDinosaurDeathUpdater';

const container = new Container();
container
    .bind<Repository>(SERVICE_IDENTIFIERS.REPOSITORY)
    .to(InMemoryDataStore)
    .inSingletonScope();

container
    .bind<RequestHandler<GetDinosaurInfoRequest, GetDinosaurInfoResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_INFO_HANDLER)
    .to(GetDinosaurInfoHandler);

container
    .bind<RequestHandler<GetDinosaurStatusRequest, GetDinosaurStatusResponse>>(SERVICE_IDENTIFIERS.GET_DINOSAUR_STATUS_HANDLER)
    .to(GetDinosaurStatusHandler);

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

container
    .bind<BasicRequestHandler<IncrementTimeBasedEventsRequest>>(SERVICE_IDENTIFIERS.INCREMENT_TIME_BASED_EVENTS_HANDLER)
    .to(IncrementTimeBasedEventsHandler);

container
    .bind<DinosaurDeathChecker>(SERVICE_IDENTIFIERS.DINOSAUR_DEATH_CHECKER)
    .to(FullDinosaurDeathChecker);

container
    .bind<DinosaurDeathUpdater>(SERVICE_IDENTIFIERS.DINOSAUR_DEATH_UPDATER)
    .to(SingleDinosaurDeathUpdater);

export default container;
