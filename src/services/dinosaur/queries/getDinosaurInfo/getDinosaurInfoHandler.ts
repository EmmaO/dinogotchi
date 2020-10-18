import {inject, injectable} from 'inversify';
import {HandlerResponse} from '../../../../services/generic/handlerResponse';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import Repository from '../../../../data/repository';
import GetDinosaurInfoRequest from './getDinosaurInfoRequest';
import {StatusCodes} from 'http-status-codes';
import GetDinosaurInfoResponse from './getDinosaurInfoResponse';
import {Duration, ZonedDateTime, ZoneOffset} from '@js-joda/core';
import {RequestHandler} from '../../../../services/generic/requestHandler';

@injectable()
/**
 * Handler for getting dinosaur info
 */
export default class GetDinosaurInfoHandler implements RequestHandler<GetDinosaurInfoRequest, GetDinosaurInfoResponse> {
    private _repository : Repository;

    /**
     * Constructor
     * @param {Repository} repository The datastore containing the dinosaur
     */
    public constructor(
        @inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository,
    ) {
      this._repository = repository;
    }

    /**
     * Handles GetDinosaurInfo requests
     * @param {GetDinosaurInfoRequest} request The request for information
     * @return {HandlerResponse<GetDinosaurInfoResponse>} Basic information about the dinosaur
     */
    public handleRequest(request : GetDinosaurInfoRequest) : HandlerResponse<GetDinosaurInfoResponse> {
      if (this._repository.dinosaur.length == 0) {
        const res : HandlerResponse<GetDinosaurInfoResponse> = {
          statusCode: StatusCodes.NOT_FOUND,
          errors: [{
            error: 'Not found',
          }],
          successResponse: null,
        };

        return res;
      }

      const dinosaur = this._repository.dinosaur[0];

      let dinosaurAge : Duration;
      if (dinosaur.alive) {
        const now = ZonedDateTime.now(ZoneOffset.UTC).toInstant();
        dinosaurAge = Duration.between(dinosaur.born, now);
      } else {
        dinosaurAge = Duration.between(dinosaur.born, dinosaur.died);
      }

      const dinosaurResponse : GetDinosaurInfoResponse = {
        dinosaur: {
          name: dinosaur.name,
          alive: dinosaur.alive,
          age: dinosaurAge,
        },
      };

      const res : HandlerResponse<GetDinosaurInfoResponse> = {
        statusCode: StatusCodes.OK,
        errors: [],
        successResponse: dinosaurResponse,
      };

      return res;
    }
}
