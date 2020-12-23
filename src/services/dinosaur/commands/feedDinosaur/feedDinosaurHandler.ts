import {inject, injectable} from 'inversify';
import Repository from '../../../../data/repository';
import {BasicHandlerResponse} from '../../../../services/generic/handlerResponse';
import FeedDinosaurRequest from './feedDinosaurRequest';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import {StatusCodes} from 'http-status-codes';
import ERRORS from '../../../../data/models/constants/errors';
import {DinosaurDeathUpdater} from '../../..';
import {DinoInteractionCommandHandler} from '../../../../services/generic/requestHandler';

@injectable()
/**
 * The Handler for feeding the dinosaur
 */
export default class FeedDinosaurHandler extends DinoInteractionCommandHandler<FeedDinosaurRequest> {
    private _baseAmountToReduceHungerBy : number = 6;
    private _maxBoredomToEat : number = 7;

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
     * Handle feed dinosaur request
     * @param {FeedDinosaurRequest} request Request to feed dinosaur
     * @return {BasicHandlerResponse} response to indicate success
     */
    public handleDinosaurInteraction(request : FeedDinosaurRequest) : BasicHandlerResponse {
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
