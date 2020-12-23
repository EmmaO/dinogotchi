import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import ERRORS from '../../../../data/models/constants/errors';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import {DinoInteractionCommandHandler} from '../../../../services/generic/requestHandler';
import WaterDinosaurRequest from './waterDinosaurRequest';
import DinosaurDeathUpdater from '../../../generic/dinosaurInteractionHandler/dinosaurDeathUpdater'

@injectable()
/**
 * Handler for watering the dinosaur
 */
export default class WaterDinosaurHandler extends DinoInteractionCommandHandler<WaterDinosaurRequest> {
  private _baseAmountToReduceThirstBy : number = 7;
  private _maxBoredomToDrink : number = 9;

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
   * Handle WaterDinosaur requests
   * @param {WaterDinosaurRequest} request The request
   * @return {BasicHandlerResponse} response to indicate success
   */
  public handleDinosaurInteraction(request: WaterDinosaurRequest) : BasicHandlerResponse {
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

    if (dinosaur.thirst < 0) {
      dinosaur.environment.water += (dinosaur.thirst * -1);
      dinosaur.thirst = 0;
    }

    return {
      statusCode: StatusCodes.OK,
      errors: [],
    };
  }
}
