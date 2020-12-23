import {Instant} from '@js-joda/core';
import Environment from './environment';

interface Dinosaur {
    name : string;
    alive: boolean;
    hunger: number;
    thirst: number;
    grumpiness: number;
    size: number;
    born: Instant;
    died: Instant;
    causeOfDeath: string;
    environment: Environment;
};

export default Dinosaur;
