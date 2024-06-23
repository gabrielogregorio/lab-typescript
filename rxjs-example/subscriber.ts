// NEEDS FIX ERROR HANDLING
import { Observable, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

class Subscriber {
  constructor(private observable: Observable<string>, name: string) {
    this.name = name;
  }

  private subscription: Subscription | null = null;
  private name: string;

  subscribe() {
    console.log(`subscriber-${this.name}: 👋 "${this.name}" subscribed`);

    // pipe: aplica multiples operators with multiples arguments and returns new observable
    // with pipes arguments in same order
    this.subscription = this.observable.pipe(retry(3)).subscribe({
      next: (message) => {
        this.handleMessage(message);
      },
      error: (error) => {}, //console.log(`subscriber-${this.name}: error ${error}`),
      complete: () => {}, //console.log(`subscriber-${this.name}: completed`),
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log(`subscriber-${this.name}: ⚠️ unsubscribed`);
    }
  }

  private handleMessage(message: string) {
    console.log(`\nsubscriber-${this.name}: 🚀 starting process message "${message}"`);

    const failure = Math.random() > 0.8;
    if (failure) {
      console.log(`subscriber-${this.name}: ❌ error on handle message "${message}"`);
      throw new Error('A random error');
    }

    console.log(`subscriber-${this.name}: ✅ successfully process message ${message}`);
  }
}

export const createSubscriber = (observable: Observable<string>, name: string) =>
  new Subscriber(observable, name);
