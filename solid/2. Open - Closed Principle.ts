/* OCP introduction
Software entities (classes, modules, functions, etc.) must be open for extension, but closed for modification.

Open for Extension: It must be possible to add new functionality and behaviors, through interfaces, abstract classes and design patterns
Closed to Modification: Once developed and tested, your code will no longer need to be changed
*/

// bad
class PaymentProcessor {
  processCreditCardPayment(amount: number, cardNumber: string, expiryDate: string) {
    // credit card logic
  }
}

// what if needs add pix, paypal and another?
// good
interface PaymentMethod {
  processPayment(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  constructor(private cardNumber: string, private expiryDate: string) {}

  processPayment(amount: number) {}
}

class PayPalPayment implements PaymentMethod {
  constructor(private userEmail: string) {}

  processPayment(amount: number) {}
}

class PaymentProcessorV2 {
  processPayment(method: PaymentMethod, amount: number) {
    method.processPayment(amount);
  }
}
