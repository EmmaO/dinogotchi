import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import Repository from '../../../../data/repository';
import {BasicRequestHandler} from '../../../../services/generic/requestHandler';
import PlayWithDinosaurRequest from './playWithDinosaurRequest';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';

@injectable()
/**
 * Handler for playing with dinosaur
 */
export default class PlayWithDinosaurHandler implements BasicRequestHandler<PlayWithDinosaurRequest> {
    private _repository : Repository;

    private _amountToReduceBoredomBy : number = 3;

    /**
     * Constructor
     * @param {Repository} repository Datastore containing the dinosaur
     */
    public constructor(@inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository) {
      this._repository = repository;
    }

    /**
     * Handle PlayWithDinosaurRequest
     * @param {PlayWithDinosaurRequest} request The request
     * @return {BasicHandlerResponse} Response indicating success
     */
    public handleRequest(request : PlayWithDinosaurRequest) : BasicHandlerResponse {
      if (this._repository.dinosaur.length == 0) {
        return {
          statusCode: StatusCodes.NOT_FOUND,
          errors: [{
            error: 'No dinosaur exists',
          }],
        };
      }

      this._repository.dinosaur[0].grumpiness -= this._amountToReduceBoredomBy;

      return {
        statusCode: StatusCodes.OK,
        errors: [],
      };
    }
}
