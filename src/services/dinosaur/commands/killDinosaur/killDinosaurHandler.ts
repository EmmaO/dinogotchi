import {StatusCodes} from 'http-status-codes';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {DinoInteractionCommandHandler} from '../../../../services/generic/requestHandler';
import KilLDinosaurRequest from './killDinosaurRequest';
import {ZonedDateTime, ZoneRegion} from '@js-joda/core';
import CAUSE_OF_DEATH from '../../../../data/models/constants/causeOfDeath';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import DinosaurDeathUpdater from '../../../generic/dinosaurInteractionHandler/dinosaurDeathUpdater';

@injectable()
/**
 * Handler for killing the dinosaur
 */
export default class KillDinosaurHandler extends DinoInteractionCommandHandler<KilLDinosaurRequest> {
  /**
   * Constructor
   * @param {Repository} repository The datastore containing the dinosaur,
   * @param {DinosaurDeathUpdater} dinosaurDeathUpdater Service for updating death status of dinosaur
   */
  public constructor(
    @inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository,
    @inject(SERVICE_IDENTIFIERS.DINOSAUR_DEATH_UPDATER) dinosaurDeathUpdater : DinosaurDeathUpdater,
  ) {
    super(repository, dinosaurDeathUpdater);
  }

  /**
   * Handles KillDinosaur requests
   * @param {KillDinosaurRequest} request The request
   * @return {BasicHandlerResponse} response indicating success
   */
  public handleDinosaurInteraction(request : KilLDinosaurRequest) : BasicHandlerResponse {
    const dinosaur = this._repository.dinosaur[0];
    dinosaur.alive = false;
    dinosaur.died = ZonedDateTime.now(ZoneRegion.UTC).toInstant();
    dinosaur.causeOfDeath = CAUSE_OF_DEATH.MURDER;

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
