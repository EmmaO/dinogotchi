import {StatusCodes} from 'http-status-codes';
import {RequestHandler} from '../../../../services';
import Repository from '../../../../data/repository';
import {HandlerResponse} from '../../../../services/generic/handlerResponse';
import GetEnvironmentStatusRequest from './getEnvironmentStatusRequest';
import GetEnvironmentStatusResponse from './getEnvironmentStatusResponse';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';

@injectable()
/**
 * Handles GetEnvironmentStatus requests
 */
export default class GetEnvironmentStatusHandler implements RequestHandler<GetEnvironmentStatusRequest, GetEnvironmentStatusResponse> {
  private _repository : Repository;

  /**
   * Constructor
   * @param {Repository} repository Datastore containing dinosaur and environment
   */
  public constructor(@inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository) {
    this._repository = repository;
  }

  /**
   * Handles GetEnvironmentStatus requests
   * @param {GetEnvironmentStatusRequest} request The request
   * @return {HandlerResponse<GetEnvironmentStatusResponse>} The response
   */
  public handleRequest(request: GetEnvironmentStatusRequest) : HandlerResponse<GetEnvironmentStatusResponse> {
    const message = this.getStatusMessage();

    return {
      statusCode: StatusCodes.OK,
      successResponse: {
        status: message,
      },
      errors: [],
    }
  }

  /**
   * Gets a status message which indicates current environment state
   * @return {string}
   */
  private getStatusMessage() : string {
    if (this._repository.dinosaur.length == 0) {
      return 'The room looks empty';
    }

    if (!this._repository.dinosaur[0].alive) {
      return 'The most striking feature of the room is the dead dinosaur';
    }

    const environment = this._repository.environment[0];
    const environmentFill = environment.food + environment.poop + environment.water;

    let responseString = '';
    if (environmentFill >= 25) {
      responseString = 'The room is filled to the brim with ';
    } else if (environmentFill >= 15) {
      responseString = 'The room is starting to fill up with ';
    } else if (environmentFill >= 5) {
      responseString = 'The room contains some '
    } else if (environmentFill > 0) {
      return 'The room is pretty clean all things considered';
    } else {
      return 'The room is spotless';
    }

    const roomContents : string[] = [];
    if (environment.food > 0) {
      roomContents.push('food');
    }
    if (environment.water > 0) {
      roomContents.push('water');
    }
    if (environment.poop > 0) {
      roomContents.push('poop');
    }

    responseString += this.convertToReadableListString(roomContents);

    return responseString;
  }

  /**
   * Converts an input array into a human readable list.
   * ["1", "2"] -> "1 and 2"
   * ["1", "2", "3"] -> "1, 2 and 3"
   * @param {string[]} input input array
   * @return {string}
   */
  private convertToReadableListString(input : string[]) : string {
    if (input.length == 0) {
      return 'nothing';
    } else if (input.length == 1) {
      return input[0];
    } else if (input.length == 2) {
      return `${input[0]} and ${input[1]}`;
    } else {
      return `${input.slice(0, input.length - 2).join(', ')} and ${input[input.length - 1]}`;
    }
  }
}
