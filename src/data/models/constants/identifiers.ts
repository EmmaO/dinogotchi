const SERVICE_IDENTIFIERS = {
  REPOSITORY: Symbol('Repository'),

  // dinosaur/queries
  GET_DINOSAUR_INFO_HANDLER: Symbol('GetDinosaurInfoHandler'),
  GET_DINOSAUR_STATUS_HANDLER: Symbol('GetDinosaurStatusHandler'),

  // dinosaur/commands
  CREATE_DINOSAUR_HANDLER: Symbol('CreateDinosaurHandler'),
  FEED_DINOSAUR_HANDLER: Symbol('FeedDinosaurHandler'),
  KILL_DINOSAUR_HANDLER: Symbol('KillDinosaurHandler'),
  PLAY_WITH_DINOSAUR_HANDLER: Symbol('PlayWithDinosaurHandler'),
  WATER_DINOSAUR_HANDLER: Symbol('WaterDinosaurHandler'),

  // environment/queries
  GET_ENVIRONMENT_STATUS_HANDLER: Symbol('GetEnvironmentStatusHandler'),

  // environment/commands
  CLEAR_DINOSAUR_AND_WASTER_HANDLER: Symbol('ClearDinosaurAndWasteHandler'),
  CLEAR_WASTE_HANDLER: Symbol('ClearWasteHandler'),

};

export default SERVICE_IDENTIFIERS;
