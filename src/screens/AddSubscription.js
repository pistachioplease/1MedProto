import React, { useContext } from 'react';
import Util from '../library/Util';
import AddSubscriptionView from '../components/AddSubscriptionView'; 
import { AuthContext } from '../navigation/AuthContext';
const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
// const STRIPE_PUBLISHABLE_KEY = 'pk_live_4odXgPyioka2twZohkFCjFvT001mMHDjwy';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_RNCx0iM84WbGbWzHK1Dm4xeQ009seqqc5y';

/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React 
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

/**
 * subscribe user
 * 1) create Customer
 * 2) create PaymentMethod
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken, email, uid, planId) => {
  return new Promise((resolve, reject) => {
    // console.log('Credit card token\n', creditCardToken);
    // create customer
    // console.log(email);
    let customer = Util.createCustomer(creditCardToken, email, uid, planId);
    setTimeout(() => {
      if (customer != null)
          resolve();
      else
          reject();
    }, 1000)
  });
};

/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default class AddSubscription extends React.Component {
  static contextType = AuthContext;
  static navigationOptions = {
    title: 'Subscription page',
  };
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      error: null,
      user: null,
    }
  }

  componentDidMount() {
    let userDetails = this.context;
    this.setState({user: userDetails});
  }

  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    const { user } = this.state;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    // TODO: send credit card token to firebase
    const { error } = await subscribeUser(creditCardToken, user.email, user.uid, this.props.route.params.planId);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      // navigation.navigate('Doctors');
    }
  };
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error, user } = this.state;
    // console.log(this.props.route.params.planId);
    // console.log(this.props.route.params.productId);

    return (
        <AddSubscriptionView
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
        />
    );
  }
}