// OBSERVABLE
import { publisher } from './publisher';
import { createSubscriber } from './subscriber';

// dois consumidores
const subscriber1 = createSubscriber(publisher.getObservable(), 'api1');
const subscriber2 = createSubscriber(publisher.getObservable(), 'api2');

// estão inscritos
subscriber1.subscribe();
subscriber2.subscribe();

publisher.publish('Hello world');
publisher.publish('example test');

// subscriber - assinante
// publisher - publicador
