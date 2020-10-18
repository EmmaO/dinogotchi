import {Duration} from '@js-joda/core';

interface GetDinosaurInfoResponse {
    dinosaur : Dinosaur;
}

interface Dinosaur {
    name : string;
    age: Duration;
    alive: Boolean;
}

export default GetDinosaurInfoResponse;
