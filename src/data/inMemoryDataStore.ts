import {injectable} from 'inversify';
import Repository from './repository';
import {Dinosaur, Environment} from './models/index';

@injectable()
/** An in-memory implementation of Repository */
export default class InMemoryDataStore implements Repository {
    public dinosaur : Dinosaur[] = [];
    public environment : Environment[] = [{
      food: 0,
      poop: 0,
      water: 0,
    }];
}
