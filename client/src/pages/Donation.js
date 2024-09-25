// client/src/pages/Donation.js

import React, { useEffect, useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import CardCheckOut from "../components/CardCheckOut";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe using your publishable key from the .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function Donation() {
  const [clientSecret, setClientSecret] = useState("");
  const amountRef = useRef(null); // Reference to the donation amount input

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amountRef.current || !amountRef.current.value) {
      alert('Please enter a donation amount.');
      return;
    }
    const amount = amountRef.current.value * 100;
    console.log('Donation Amount (in cents):', amount);

    // Create PaymentIntent on the server
    const response = await fetch("http://localhost:3001/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  return (
    <div className="flex flex-col-2">
      <div className="text-center">
        <h1 className="text-2xl m-5">How much would you like to give?</h1>
        <div>
          <form
            className="flex flex-col gap-4 ml-6 mb-2 border-gray-200 rounded-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="m-2 block">
                <label htmlFor="donation">Donation Amount ($):</label>
              </div>
              <input
                className="rounded-md border-gray-200"
                id="donation"
                type="number"
                name="price"
                placeholder="25.00"
                required
                ref={amountRef}
              />
            </div>
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Donate
            </button>
          </form>
        </div>
        <div>
          {/* Display the charity card */}
          <CardCheckOut />
        </div>
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}