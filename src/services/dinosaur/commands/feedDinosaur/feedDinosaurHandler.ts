import {inject} from 'inversify';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {BasicRequestHandler} from '../../../../services';
import FeedDinosaurRequest from './feedDinosaurRequest';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import {StatusCodes} from 'http-status-codes';
import ERRORS from '../../../../data/models/constants/errors';

/**
 * The Handler for feeding the dinosaur
 */
export default class FeedDinosaurHandler implements BasicRequestHandler<FeedDinosaurRequest> {
    private _repository : Repository;

    private _baseAmountToReduceHungerBy : number = 6;
    private _maxBoredomToEat : number = 7;

    /**
     * Constructor
     * @param {Repository} repository The datastore containing the dinosaur
     */
    public constructor(@inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository) {
      this._repository = repository;
    }

    /**
     * Handle feed dinosaur request
     * @param {FeedDinosaurRequest} request Request to feed dinosaur
     * @return {BasicHandlerResponse} response to indicate success
     */
    public handleRequest(request : FeedDinosaurRequest) : BasicHandlerResponse {
      if (this._repository.dinosaur.length == 0) {
        return {
          statusCode: StatusCodes.NOT_FOUND,
          errors: [{
            error: ERRORS.NO_DINOSAUR,
          }],
        };
      }

      const dinosaur = this._repository.dinosaur[0];

      if (dinosaur.grumpiness > this._maxBoredomToEat) {
        return {
          statusCode: StatusCodes.CONFLICT,
          errors: [{
            error: ERRORS.GRUMPY,
          }],
        };
      }

      const amountToReduceHungerBy = this._baseAmountToReduceHungerBy - dinosaur.size;
      dinosaur.hunger -= amountToReduceHungerBy;

      if (dinosaur.hunger < 0) {
        this._repository.environment[0].food += (dinosaur.hunger * -1);
        dinosaur.hunger = 0;
      }

      return {
        statusCode: StatusCodes.OK,
        errors: [],
      };
    }
}
