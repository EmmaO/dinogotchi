import {BasicHandlerResponse} from '../../../generic/handlerResponse';
import Repository from '../../../../data/repository';
import {BasicRequestHandler} from '../../../generic/requestHandler';
import {StatusCodes} from 'http-status-codes';
import ERRORS from '../../../../data/models/constants/errors';
import ClearWasteRequest from './clearWasteRequest';

/**
 * Handles ClearWasteRequests
 */
export default class ClearWasteHandler implements BasicRequestHandler<ClearWasteRequest> {
  private _repository : Repository;

  private _maxDinosaurGrumpinessWithoutRisk = 4;
  /**
   * Constructor
   * @param {Repository} repository The datastore containing the dinosaur and environment
   */
  public constructor(repository : Repository) {
    this._repository = repository;
  }

  /**
   * Handles ClearWaste requests
   * @param {ClearWasteRequest} request The request
   * @return {BasicHandlerResponse} response indicating success
   */
  public handleRequest(request : ClearWasteRequest) : BasicHandlerResponse {
    if (this._repository.dinosaur.length > 0) {
      const dinosaur = this._repository.dinosaur[0];

      if (dinosaur.grumpiness > this._maxDinosaurGrumpinessWithoutRisk) {
        return {
          statusCode: StatusCodes.CONFLICT,
          errors: [
            {
              error: ERRORS.DANGER,
            },
          ],
        }
      }
    }

    this._repository.environment[0].poop = 0;
    this._repository.environment[0].water = 0;
    this._repository.environment[0].food = 0;

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
