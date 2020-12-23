import {BasicHandlerResponse} from '../../../generic/handlerResponse';
import Repository from '../../../../data/repository';
import {DinoInteractionCommandHandler} from '../../../generic/requestHandler';
import PlayWithDinosaurRequest from './playWithDinosaurRequest';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../../data/models/constants/identifiers';
import DinosaurDeathUpdater from '../../common/dinosaurDeathUpdate/dinosaurDeathUpdater';

@injectable()
/**
 * Handler for playing with dinosaur
 */
export default class PlayWithDinosaurHandler extends DinoInteractionCommandHandler<PlayWithDinosaurRequest> {
    private _amountToReduceBoredomBy : number = 3;

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
     * Handle PlayWithDinosaurRequest
     * @param {PlayWithDinosaurRequest} request The request
     * @return {BasicHandlerResponse} Response indicating success
     */
    public handleDinosaurInteraction(request : PlayWithDinosaurRequest) : BasicHandlerResponse {
      this._repository.dinosaur[0].grumpiness -= this._amountToReduceBoredomBy;

      return {
        statusCode: StatusCodes.OK,
        errors: [],
      };
    }
}
