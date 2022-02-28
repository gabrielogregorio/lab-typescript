import IObserver from './iobserver';

export default class Observer implements IObserver {
  constructor(public readonly id: number) {}

  update(): void {
    console.log(`Observer ${this.id} updated`);
  }
}
