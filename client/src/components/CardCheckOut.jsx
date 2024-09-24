import React from 'react';
import { useQuery } from "@apollo/client";
import { SINGLE_CHARITY } from "../utils/queries";
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe using your publishable key from the .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CardCheckOut = () => {
  const currentCharity = localStorage.getItem("current-charity");
  
  // Fetch charity data using the current charity ID from localStorage
  const { data, loading, error } = useQuery(SINGLE_CHARITY, {
    variables: { charityId: currentCharity },
  });

  // Destructure charity data from the response
  const charity = data?.charity;

  const handleDonateClick = async () => {
    try {
      const stripe = await stripePromise;

      // Create a checkout session by making a request to the backend
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during donation process:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading charity information</p>;
  if (!charity) return <p>No charity found</p>;

  return (
    <div className="flex flex-row flex-wrap justify-center text-black">
      <div className="m-2 max-w-xs bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img
          style={{ height: "200px" }}
          className="w-full rounded-t-lg object-cover"
          src={charity.imgLink}
          alt={charity.name}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {charity.name}
          </h5>
          <p className="mission mb-3 font-normal text-gray-700 dark:text-gray-400">
            EIN: {charity.ein}
          </p>
        </div>

        <div className="p-5 text-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDonateClick}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCheckOut;