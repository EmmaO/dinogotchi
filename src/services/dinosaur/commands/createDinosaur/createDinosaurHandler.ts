/* eslint-disable max-len */
import {ZonedDateTime, ZoneOffset} from '@js-joda/core';
import {inject, injectable} from 'inversify';
import {BasicRequestHandler} from '../../../../services/generic/requestHandler';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import {Dinosaur} from '../../../../data/models/index';
import Repository from '../../../../data/repository';
import CreateDinosaurRequest from './createDinosaurRequest'
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {StatusCodes} from 'http-status-codes';

@injectable()
/** Handler for CreateDinosaurRequests */
export default class CreateDinosaurHandler implements BasicRequestHandler<CreateDinosaurRequest> {
    private _repository : Repository;

    private _defaultBoredom : number = 0;
    private _defaultHunger : number = 5;
    private _defaultThirst : number = 4;

    /** constructor
     * @param {Repository} repository dataStore for dinosaurs
     */
    public constructor(
        @inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository,
    ) {
      this._repository = repository;
    }

    /** Creates a new dinosaur in the DataStore
    * @param {CreateDinosaurRequest} request The create dinosaur request
    * @return {BasicHandlerResponse} response with status code
    */
    public handleRequest(request : CreateDinosaurRequest) : BasicHandlerResponse {
      if (this._repository.dinosaur.length > 0) {
        const res : BasicHandlerResponse = {
          statusCode: StatusCodes.CONFLICT,
          errors: [{
            error: 'A dinosaur already exists',
          }],
        };

        return res;
      }

      const dinosaur : Dinosaur = {
        name: request.name,
        alive: true,
        grumpiness: this._defaultBoredom,
        hunger: this._defaultHunger,
        thirst: this._defaultThirst,
        size: 0,
        born: ZonedDateTime.now(ZoneOffset.UTC).toInstant(),
        died: null,
        causeOfDeath: null,
      };

      this._repository.dinosaur.push(dinosaur);

      const res : BasicHandlerResponse = {
        statusCode: StatusCodes.OK,
        errors: [],
      };

      return res;
    }
};
