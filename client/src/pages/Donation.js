import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import CardCheckOut from "../components/CardCheckOut";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function Donation() {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  const handlePaymentIntentCreated = (clientSecret) => {
    setClientSecret(clientSecret);
  };

  const handlePaymentSuccess = () => {
    setClientSecret("");
  };

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Display the charity card with amount input and donate button */}
      <CardCheckOut onPaymentIntentCreated={handlePaymentIntentCreated} />
  
      {clientSecret && (
        <div className="mt-4">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              onPaymentSuccess={handlePaymentSuccess}
              onMessage={handleMessage}
            />
          </Elements>
        </div>
      )}
  
      {/* Display the confirmation message */}
      {message && (
        <div id="payment-message" className="mt-4 text-green-600">
          {message}
        </div>
      )}
    </div>
  );
}