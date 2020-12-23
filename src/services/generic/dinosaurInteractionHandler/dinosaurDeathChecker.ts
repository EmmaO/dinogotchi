import {Dinosaur} from '../../../data/models';
import {DinosaurHealthSummary} from './dinosaurHealthSummary';

export default interface DinosaurDeathChecker {
  getDinosaurHealthStatus(dinosaur : Dinosaur) : DinosaurHealthSummary
};
