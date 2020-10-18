import {BasicHandlerResponse} from '../../..';
import Repository from '../../../../data/repository';
import {BasicRequestHandler} from '../../../generic/requestHandler';
import ClearDinosaurAndWasteRequest from './clearDinosaurAndWasteRequest';
import {StatusCodes} from 'http-status-codes';
import ERRORS from '../../../../data/models/constants/errors';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';

@injectable()
/**
 * Handles ClearDinosaurRequests
 */
export default class ClearDinosaurAndWasteHandler implements BasicRequestHandler<ClearDinosaurAndWasteRequest> {
  private _repository : Repository;

  /**
   * Constructor
   * @param {Repository} repository The datastore containing the dinosaur
   */
  public constructor(@inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository) {
    this._repository = repository;
  }

  /**
   * Handles ClearDinosaurAndWaste requests
   * @param {ClearDinosaurAndWasteRequest} request The request
   * @return {BasicHandlerResponse} response indicating success
   */
  public handleRequest(request : ClearDinosaurAndWasteRequest) : BasicHandlerResponse {
    if (this._repository.dinosaur.length == 0) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        errors: [
          {
            error: ERRORS.NO_DINOSAUR,
          },
        ],
      };
    }

    const dinosaur = this._repository.dinosaur[0];
    if (!dinosaur.died) {
      return {
        statusCode: StatusCodes.CONFLICT,
        errors: [
          {
            error: 'Can\'t clear the dinosaur while it is still alive',
          },
        ],
      }
    }

    this._repository.dinosaur = [];
    this._repository.environment[0].poop = 0;
    this._repository.environment[0].water = 0;
    this._repository.environment[0].food = 0;

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
