import {Instant} from '@js-joda/core';

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
};

export default Dinosaur;
