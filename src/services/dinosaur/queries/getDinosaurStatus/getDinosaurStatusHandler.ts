import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import Repository from '../../../../data/repository';
import {RequestHandler} from '../../../../services/generic/requestHandler';
import {HandlerResponse} from '../../../../services/generic/handlerResponse';
import GetDinosaurStatusRequest from './getDinosaurStatusRequest';
import GetDinosaurStatusResponse from './getDinosaurStatusResponse';
import {StatusCodes} from 'http-status-codes';
import {Dinosaur} from '../../../../data/models';

@injectable()
/**
 * Handler for getting Dinosaur status
 */
export default class GetDinosaurStatusHandler implements RequestHandler<GetDinosaurStatusRequest, GetDinosaurStatusResponse> {
  private _repository: Repository;

  /**
  * Constructor
  * @param {Repository} repository the datastore containing the dinosaur
  */
  public constructor(@inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository) {
    this._repository = repository;
  }

  /**
 * Handles GetDinosaurStatus requests
 * @param {GetDinosaurStatusRequest} request the request for information
 * @return {HandlerResponse<GetDinosaurStatusResponse>} information on dinosaur's current status
 */
  public handleRequest(request : GetDinosaurStatusRequest) : HandlerResponse<GetDinosaurStatusResponse> {
    let dinosaurStatus : string;

    if (this._repository.dinosaur.length == 0) {
      dinosaurStatus = 'There is no dinosaur';
    } else {
      const dinosaur = this._repository.dinosaur[0];
      dinosaurStatus = this.getStatusFromDinosaur(dinosaur);
    }

    const res : HandlerResponse<GetDinosaurStatusResponse> = {
      statusCode: StatusCodes.OK,
      errors: [],
      successResponse: {
        status: dinosaurStatus,
      },
    };

    return res;
  }

  /**
   * Returns the status of the dinosaur supplied in the parameter
   * @param {Dinosaur} dinosaur The dinosaur to get the status for
   * @return {string} The status of the dinosaur
   */
  private getStatusFromDinosaur(dinosaur : Dinosaur) : string {
    if (!dinosaur.alive) {
      return `The dinosaur ${dinosaur.causeOfDeath}`
    }

    const totalAilmentScore = dinosaur.hunger + dinosaur.thirst + dinosaur.grumpiness;

    if (totalAilmentScore > 25) {
      return 'The dinosaur is on the brink of death';
    }

    if (dinosaur.grumpiness >= 10) {
      return 'The dinosaur is severely depressed';
    }

    if (dinosaur.thirst >= dinosaur.hunger && dinosaur.thirst > 7) {
      return 'The dinosaur is severely dehydrated';
    }

    if (dinosaur.hunger > 7) {
      return 'The dinosaur is famished';
    }

    if (dinosaur.grumpiness > 7) {
      return 'The dinosaur seems extremely unhappy';
    }

    if (dinosaur.thirst >= dinosaur.hunger && dinosaur.thirst > 3) {
      return 'The dinosaur seems thirsty';
    }

    if (dinosaur.hunger > 3) {
      return 'The dinosaur seems peckish';
    }

    if (dinosaur.grumpiness > 3) {
      return 'The dinosaur seems a little grumpy';
    }

    return 'The dinosaur seems content'
  }
}
