export {default as GetDinosaurInfoRequest} from './dinosaur/queries/getDinosaurInfo/getDinosaurInfoRequest';
export {default as GetDinosaurInfoResponse} from './dinosaur/queries/getDinosaurInfo/getDinosaurInfoResponse';
export {default as GetDinosaurInfoHandler} from './dinosaur/queries/getDinosaurInfo/getDinosaurInfoHandler';

export {default as CreateDinosaurRequest} from './dinosaur/commands/createDinosaur/createDinosaurRequest';
export {default as CreateDinosaurHandler} from './dinosaur/commands/createDinosaur/createDinosaurHandler';

export {default as FeedDinosaurRequest} from './dinosaur/commands/feedDinosaur/feedDinosaurRequest';
export {default as FeedDinosaurHandler} from './dinosaur/commands/feedDinosaur/feedDinosaurHandler';

export {default as KillDinosaurRequest} from './dinosaur/commands/killDinosaur/killDinosaurRequest';
export {default as KillDinosaurHandler} from './dinosaur/commands/killDinosaur/killDinosaurHandler';

export {default as PlayWithDinosaurRequest} from './dinosaur/commands/playWithDinosaur/playWithDinosaurRequest';
export {default as PlayWithDinosaurHandler} from './dinosaur/commands/playWithDinosaur/playWithDinosaurHandler';

export {default as WaterDinosaurRequest} from './dinosaur/commands/waterDinosaur/waterDinosaurRequest';
export {default as WaterDinosaurHandler} from './dinosaur/commands/waterDinosaur/waterDinosaurHandler';

export {default as ClearDinosaurAndWasteRequest} from './environment/commands/clearDinosaurAndWaste/clearDinosaurAndWasteRequest';
export {default as ClearDinosaurAndWasteHandler} from './environment/commands/clearDinosaurAndWaste/clearDinosaurAndWasteHandler';

export {default as ClearWasteRequest} from './environment/commands/clearWaste/clearWasteRequest';
export {default as ClearWasteHandler} from './environment/commands/clearWaste/clearWasteHandler';

export {default as GetEnvironmentStatusRequest} from './environment/queries/getEnvironmentStatus/getEnvironmentStatusRequest';
export {default as GetEnvironmentStatusResponse} from './environment/queries/getEnvironmentStatus/getEnvironmentStatusResponse';
export {default as GetEnvironmentStatusHandler} from './environment/queries/getEnvironmentStatus/getEnvironmentStatusHandler';


export {default as ErrorResponse} from './generic/errorResponse';
export {RequestHandler, BasicRequestHandler} from './generic/requestHandler';
export {HandlerResponse, BasicHandlerResponse} from './generic/handlerResponse';
