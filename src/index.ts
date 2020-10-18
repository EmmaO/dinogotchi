import container from './config/iocConfig';
import Repository from './data/repository';
import SERVICE_IDENTIFIER from './constants/identifiers';

const repository = container.get<Repository>(SERVICE_IDENTIFIER.REPOSITORY);

console.log(repository.dinosaur.length);
