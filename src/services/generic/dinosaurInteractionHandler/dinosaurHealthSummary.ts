import {healthStatus} from './healthStatus';

export interface DinosaurHealthSummary {
  healthStatus: healthStatus;
  causeOfDeath: string;
}
