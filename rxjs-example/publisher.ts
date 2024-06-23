import { Subject } from 'rxjs';

class Publisher {
  private subject = new Subject<string>();

  publish(message: string) {
    console.log(``);
    console.log(`#============================================`);
    console.log(`# publisher: Publishing message "${message}" `);
    console.log(`#============================================`);

    this.subject.next(message);
  }

  getObservable() {
    return this.subject.asObservable();
  }
}

export const publisher = new Publisher();
