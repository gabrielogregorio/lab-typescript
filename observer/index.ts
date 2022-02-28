import Observer from './observer';
import Subject from './subject';

const observerOne = new Observer(1);
const observerTwo = new Observer(2);
const observerThree = new Observer(3);

const subject = new Subject();

subject.subscribe(observerOne);
subject.subscribe(observerTwo);
subject.subscribe(observerThree);

subject.notifyAll();
console.log('ok, all notify');

subject.unsubscribe(observerOne);
console.log('remove observer one');
subject.notifyAll();

console.log('notify three');
subject.notify(observerOne);
