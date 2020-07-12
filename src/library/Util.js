import { 
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';
import Firebase from '../library/Firebase';

const jobTitles = [
  "Internal Medicine",
  "Pediatrician",
  "Family Medicine",
  "General Surgery",
  "Psychiatry",
  "Neurology",
  "Pathology",
  "Geriatrics",
];

class Util {
  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  randomJobTitles() {
    return jobTitles[Math.floor(Math.random() * jobTitles.length)];
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async storeUser(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getUser() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      // console.log(data);

      return data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async storeEmail(email) {
    try {
      await AsyncStorage.setItem("emailData", email);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getEmail() {
    try {
      let emailData = await AsyncStorage.getItem("emailData");
      let data = JSON.parse(emailData);

      return data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async storeDoctors(doctors) {
    try {
      await AsyncStorage.setItem("doctors", JSON.stringify(doctors));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      let data = await AsyncStorage.getItem(key);
      let parsed = JSON.parse(data);
      console.log(data);

      return true;
    }
    catch(exception) {
      return false;
    }
  } 

  async checkIfSubscriptionExists() {
    
  }

  handleCustomerActionRequired({
    subscription,
    invoice,
    priceId,
    paymentMethodId,
    isRetry,
  }) {
    if (subscription && subscription.status === 'active') {
      // Subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    }

    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

    if (
      paymentIntent.status === 'requires_action' ||
      (isRetry === true && paymentIntent.status === 'requires_payment_method')
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // Start code flow to handle updating the payment details.
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc).
            throw result;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer.
              // There's a risk of the customer closing the window before the callback.
              // We recommend setting up webhook endpoints later in this guide.
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        })
        .catch((error) => {
          displayError(error);
        });
    } else {
      // No customer action needed.
      return { subscription, priceId, paymentMethodId };
    }
  }

  handlePaymentMethodRequired({
    subscription,
    paymentMethodId,
    priceId,
  }) {
    if (subscription.status === 'active') {
      // subscription is active, no customer actions required.
      return { subscription, priceId, paymentMethodId };
    } else if (
      subscription.latest_invoice.payment_intent.status ===
      'requires_payment_method'
    ) {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        subscription.latest_invoice.payment_intent.status
      );
      throw { error: { message: 'Your card was declined.' } };
    } else {
      return { subscription, priceId, paymentMethodId };
    }
  }

  retryInvoiceWithNewPaymentMethod(
    customerId,
    paymentMethodId,
    invoiceId,
    priceId
  ) {
    return (
      fetch('http://1med.pistachioplease.com/retry-invoice', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            throw result;
          }
          return result;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the addional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            invoice: result,
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            isRetry: true,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          displayError(error);
        })
    );
  }

  cancelSubscription() {
    return fetch('http://1med.pistachioplease.com/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: subscriptionId,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(cancelSubscriptionResponse => {
        // Display to the user that the subscription has been cancelled.
      });
  }
}

const U = new Util();
export default U;
