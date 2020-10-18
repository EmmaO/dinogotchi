import {StatusCodes} from 'http-status-codes';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {BasicRequestHandler} from '../../../../services/generic/requestHandler';
import KilLDinosaurRequest from './killDinosaurRequest';
import ERRORS from '../../../../data/models/constants/errors';
import {ZonedDateTime, ZoneRegion} from '@js-joda/core';
import CAUSE_OF_DEATH from '../../../../data/models/constants/causeOfDeath';

/**
 * Handler for killing the dinosaur
 */
export default class KillDinosaurHandler implements BasicRequestHandler<KilLDinosaurRequest> {
  private _repository : Repository;

  /**
   * Constructor
   * @param {Repository} repository datastore containing the dinosaur
   */
  public constructor(repository : Repository) {
    this._repository = repository;
  }

  /**
   * Handles KillDinosaur requests
   * @param {KillDinosaurRequest} request The request
   * @return {BasicHandlerResponse} response indicating success
   */
  public handleRequest(request : KilLDinosaurRequest) : BasicHandlerResponse {
    if (this._repository.dinosaur.length == 0) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        errors: [{
          error: ERRORS.NO_DINOSAUR,
        }],
      }
    }

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
