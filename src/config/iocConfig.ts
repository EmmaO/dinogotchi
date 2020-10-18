/* eslint-disable max-len */
import 'reflect-metadata';
import {Container} from 'inversify';
import SERVICE_IDENTIFIERS from '../constants/identifiers';
import InMemoryDataStore from '../data/inMemoryDataStore';
import Repository from '../data/repository';

const container = new Container();
container.bind<Repository>(SERVICE_IDENTIFIERS.REPOSITORY).to(InMemoryDataStore).inSingletonScope();

export default container;
