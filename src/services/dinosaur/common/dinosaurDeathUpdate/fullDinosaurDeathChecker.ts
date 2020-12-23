import {injectable} from 'inversify';
import CAUSE_OF_DEATH from '../../../../data/models/constants/causeOfDeath';
import {Dinosaur} from '../../../../data/models';
import {Environment} from '../../../../data/models';
import {DinosaurHealthSummary} from './dinosaurHealthSummary';
import {healthStatus} from './healthStatus';
import dinosaurDeathChecker from './dinosaurDeathChecker';

@injectable()
/**
 * Inspects status of dinosaur health to see if dinosaur should be dead. Works when there is only one dinosaur
 */
export default class FullDinosaurDeathChecker implements dinosaurDeathChecker {
  private _hungerLimit = 12;
  private _thirstLimit = 10;
  private _maxEnvironmentFill = 30;

  /**
   * Checks the health of the dinosaur
   * @param {Dinosaur} dinosaur the dinosaur whose health should be checked
   * @return {dinosaurHealthSummary} a summary of the dinosaur's health
   */
  public getDinosaurHealthStatus(dinosaur : Dinosaur) : DinosaurHealthSummary {
    const dinosaurHealthSummary = this.checkDinosaurHealth(dinosaur);
    if (dinosaurHealthSummary.healthStatus != healthStatus.alive) {
      return dinosaurHealthSummary;
    }

    const dinosaurEnvironmentHealthSummary = this.checkDinosaurEnvironment(dinosaur.environment);

    return dinosaurEnvironmentHealthSummary;
  }

  /**
   * Checks the dinosaur passed as a param to see if it should be dead
   * @param {Dinosaur} dinosaur The dinosaur to check the health for
   * @return {dinosaurHealthSummary} a summary of the dinosaur's health
   */
  private checkDinosaurHealth(dinosaur: Dinosaur) : DinosaurHealthSummary {
    if (!dinosaur.alive) {
      return {
        healthStatus: healthStatus.dead,
        causeOfDeath: dinosaur.causeOfDeath,
      };
    }

    if (dinosaur.hunger > this._hungerLimit) {
      return {
        healthStatus: healthStatus.dead,
        causeOfDeath: CAUSE_OF_DEATH.HUNGER,
      };
    }

    if (dinosaur.thirst > this._thirstLimit) {
      return {
        healthStatus: healthStatus.dead,
        causeOfDeath: CAUSE_OF_DEATH.THIRST,
      };
    }

    return {
      healthStatus: healthStatus.alive,
      causeOfDeath: null,
    }
  }

  /**
   * Used to check whether a dinosaur's environment has killed it
   * @param {Environment} environment The enviroment the dinosaur lives in
   * @return {dinosaurHealthSummary} a summary of the health of the dinosaur living in the environment
   */
  private checkDinosaurEnvironment(environment: Environment) : DinosaurHealthSummary {
    const environmentFill = environment.food + environment.poop + environment.water;
    if (environmentFill <= this._maxEnvironmentFill) {
      return {
        healthStatus: healthStatus.alive,
        causeOfDeath: null,
      };
    }

    let causeOfDeath : string;
    const impactCutOff = this._maxEnvironmentFill / 3;
    if (environment.food >= impactCutOff && environment.poop >= impactCutOff && environment.water >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.DROWNED_IN_POOP_FOOD_AND_WATER;
    } else if (environment.food >= impactCutOff && environment.poop >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.CRUSHED_BY_POOP_AND_FOOD;
    } else if (environment.food >= impactCutOff && environment.water >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.DROWNED_IN_FOOD_AND_WATER;
    } else if (environment.poop >= impactCutOff && environment.water >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.DROWNED_IN_POOP_AND_WATER;
    } else if (environment.food >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.CRUSHED_BY_FOOD;
    } else if (environment.poop >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.DROWNED_IN_POOP;
    } else if (environment.water >= impactCutOff) {
      causeOfDeath = CAUSE_OF_DEATH.DROWNED_IN_WATER;
    } else {
      causeOfDeath = 'Unknown';
    }

    return {
      healthStatus: healthStatus.dead,
      causeOfDeath: causeOfDeath,
    };
  }
}


