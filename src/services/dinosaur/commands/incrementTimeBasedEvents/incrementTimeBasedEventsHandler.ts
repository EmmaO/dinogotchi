import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {BasicHandlerResponse} from '../../../generic/handlerResponse';
import {DinosaurDeathUpdater} from '../../..';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import Repository from '../../../../data/repository';
import {DinoInteractionCommandHandler} from '../../../generic/requestHandler';
import IncrementTimeBasedEventsRequest from './incrementTimeBasedEventsRequest';

@injectable()
/** Handles IncrementTimeBasedEventsRequests*/
export default class IncrementTimeBasedEventsHandler extends DinoInteractionCommandHandler<IncrementTimeBasedEventsRequest> {
  /**
   * Constructor
   * @param {Repository} repository The datastore containing the dinosaur,
   * @param {DinosaurDeathUpdater} dinosaurDeathUpdater Service for updating death status of dinosaur
   */
  public constructor(
    @inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository,
    @inject(SERVICE_IDENTIFIERS.DINOSAUR_DEATH_UPDATER) dinosaurDeathUpdater : DinosaurDeathUpdater,
  ) {
    super(repository, dinosaurDeathUpdater);
  }

  /**
   * Handles Incrementation of time based events
   * @param {IncrementTimeBasedEventsRequest} request request
   * @return {BasicHandlerResponse} basic handler response
   */
  public handleDinosaurInteraction(request : IncrementTimeBasedEventsRequest) : BasicHandlerResponse {
    const dinosaur = this._repository.dinosaur[0];

    dinosaur.hunger++;
    if (dinosaur.hunger < 8) {
      dinosaur.environment.poop += 2;
    }

    // increment thirst half as often
    if (dinosaur.hunger % 2 == 0) {
      dinosaur.thirst++;
    }

    dinosaur.grumpiness++;
    if (dinosaur.hunger > 5 && dinosaur.thirst > 5) {
      dinosaur.grumpiness++;
    }

    const environmentFill = dinosaur.environment.food + dinosaur.environment.poop + dinosaur.environment.water;
    if (environmentFill > 20) {
      dinosaur.grumpiness++;
    }

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
