import {ZonedDateTime, ZoneRegion} from '@js-joda/core';
import {inject, injectable} from 'inversify';
import SERVICE_IDENTIFIERS from '../../../data/models/constants/identifiers';
import Repository from '../../../data/repository';
import DinosaurDeathChecker from './dinosaurDeathChecker';
import DinosaurDeathUpdater from './dinosaurDeathUpdater';
import {healthStatus} from './healthStatus';

@injectable()
/**
 * Updates dinosaur death status if required
 */
export default class SingleDinosaurDeathUpdater implements DinosaurDeathUpdater {
  private _repository: Repository;
  private _dinosaurDeathChecker: DinosaurDeathChecker;

  /**
   * Constructor
   * @param {Repository} repository The datastore containing the dinosaur
   * @param {DinosaurDeathChecker} dinosaurDeathChecker The service for checking whether dinosaur should be dead
   */
  public constructor(
    @inject(SERVICE_IDENTIFIERS.REPOSITORY) repository : Repository,
    @inject(SERVICE_IDENTIFIERS.DINOSAUR_DEATH_CHECKER) dinosaurDeathChecker : DinosaurDeathChecker,
  ) {
    this._repository = repository;
    this._dinosaurDeathChecker = dinosaurDeathChecker;
  }

  /**
   * Checks to see if dinosaur should be dead and updates status accordingly if so
   */
  public updateDinosaurDeathStatusIfAppropriate(): void {
    if (this._repository.dinosaur.length == 0) return;

    const dinosaur = this._repository.dinosaur[0];
    const dinosaurHealthSummary = this._dinosaurDeathChecker.getDinosaurHealthStatus(dinosaur);

    if (dinosaurHealthSummary.healthStatus != healthStatus.alive) {
      dinosaur.alive = false;
      dinosaur.causeOfDeath = dinosaurHealthSummary.causeOfDeath;
      dinosaur.died = ZonedDateTime.now(ZoneRegion.UTC).toInstant();
    }
  }
}
