import {StatusCodes} from 'http-status-codes';
import ERRORS from '../../../../data/models/constants/errors';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {BasicRequestHandler} from '../../../../services/generic/requestHandler';
import WaterDinosaurRequest from './waterDinosaurRequest';

/**
 * Handler for watering the dinosaur
 */
export default class WaterDinosaurHandler implements BasicRequestHandler<WaterDinosaurRequest> {
  private _repository : Repository;

  private _baseAmountToReduceThirstBy : number = 7;
  private _maxBoredomToDrink : number = 9;

  /**
   * Constructor
   * @param {Repository} repository Datastore containing the dinosaur
   */
  public constructor(repository : Repository) {
    this._repository = repository;
  }

  /**
   * Handle WaterDinosaur requests
   * @param {WaterDinosaurRequest} request The request
   * @return {BasicHandlerResponse} response to indicate success
   */
  public handleRequest(request: WaterDinosaurRequest) : BasicHandlerResponse {
    if (this._repository.dinosaur.length == 0) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        errors: [{
          error: ERRORS.NO_DINOSAUR,
        }],
      };
    }

    const dinosaur = this._repository.dinosaur[0];

    if (dinosaur.grumpiness > this._maxBoredomToDrink) {
      return {
        statusCode: StatusCodes.CONFLICT,
        errors: [{
          error: ERRORS.GRUMPY,
        }],
      };
    }

    const amountToReduceThirstBy = this._baseAmountToReduceThirstBy - dinosaur.size;
    dinosaur.thirst -= amountToReduceThirstBy;

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
