import {StatusCodes} from 'http-status-codes';
import {injectable} from 'inversify';
import ERRORS from '../../data/models/constants/errors';
import Repository from '../../data/repository';
import DinosaurDeathUpdater from './dinosaurInteractionHandler/dinosaurDeathUpdater'
import {BasicHandlerResponse, HandlerResponse} from './handlerResponse';

export interface RequestHandler<TRequest, TResponse> {
    handleRequest(request : TRequest): HandlerResponse<TResponse>
}

export interface BasicRequestHandler<TRequest> {
    handleRequest(request : TRequest): BasicHandlerResponse
}

@injectable()
/**
 * Overridable class that checks death status of dinosaur before and after command
 */
export abstract class DinoInteractionCommandHandler<TRequest> implements BasicRequestHandler<TRequest> {
    protected _dinosaurDeathUpdater: DinosaurDeathUpdater;
    protected _repository: Repository;

    /**
    * Constructor
    * @param {Repository} repository data store containing the dinosaur
    * @param {DinosaurDeathUpdater} dinosaurDeathUpdater Checks to see if dinosaur is dead after a command
    */
    protected constructor(
        repository : Repository,
        dinosaurDeathUpdater : DinosaurDeathUpdater,
    ) {
      this._repository = repository;
      this._dinosaurDeathUpdater = dinosaurDeathUpdater;
    }

    /**
     * Handles requests and updates dinosaur death status afterwards
     * @param {T} request the request to fulfil
     * @return {BasicHandlerResponse} response from implemented class
     */
    public handleRequest(request : TRequest) : BasicHandlerResponse {
      if (this._repository.dinosaur.length == 0) {
        return {
          statusCode: StatusCodes.NOT_FOUND,
          errors: [{
            error: ERRORS.NO_DINOSAUR,
          }],
        };
      }

      const dinosaur = this._repository.dinosaur[0];

      if (!dinosaur.alive) {
        return {
          statusCode: StatusCodes.CONFLICT,
          errors: [{
            error: ERRORS.DEAD,
          }],
        }
      }

      const response = this.handleDinosaurInteraction(request);

      this._dinosaurDeathUpdater.updateDinosaurDeathStatusIfAppropriate();

      return response;
    }

    abstract handleDinosaurInteraction(request : TRequest) : BasicHandlerResponse;
}
