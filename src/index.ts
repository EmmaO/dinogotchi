import express from 'express';
import environmentRouter from './routers/environmentRouter';
import dinosaurRouter from './routers/dinosaurRouter';
import {IncrementTimeBasedEventsRequest, BasicRequestHandler} from './services';
import container from './config/iocConfig';
import SERVICE_IDENTIFIERS from './data/models/constants/identifiers';

const app = express();
app.use(express.json());

const port = process.env.Port || '8000';

app.use('/environment', environmentRouter);
app.use('/dinosaur', dinosaurRouter);

const incrementTimeBasedEventsHandler = container.get<BasicRequestHandler<IncrementTimeBasedEventsRequest>>(SERVICE_IDENTIFIERS.INCREMENT_TIME_BASED_EVENTS_HANDLER);

setInterval(() => {
  incrementTimeBasedEventsHandler.handleRequest({});
}, 30 * 1000)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
})
    .on('error', (err) => {
      return console.error(err);
    });
