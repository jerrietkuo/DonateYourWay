import React, { useState, useRef } from 'react';
import { useQuery } from "@apollo/client";
import { SINGLE_CHARITY } from "../utils/queries";

const CardCheckOut = ({ onPaymentIntentCreated }) => {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const amountRef = useRef(null);

  let currentCharity = localStorage.getItem("current-charity");
  const { data, loading } = useQuery(SINGLE_CHARITY, {
    variables: { charityId: currentCharity },
  });

  // Destructure charity data from the response
  const charity = data?.charity;

  const handleDonateClick = async () => {
    if (!amountRef.current || !amountRef.current.value) {
      alert('Please enter a donation amount.');
      return;
    }
    const amount = amountRef.current.value * 100; // Convert to cents

    setLoadingPayment(true);

    try {
      const response = await fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const { clientSecret } = await response.json();

      // Notify parent component (Donation.js) that the payment intent is created
      onPaymentIntentCreated(clientSecret);

      // Clear the amount input field
      amountRef.current.value = "";
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your payment. Please try again.');
    } finally {
      setLoadingPayment(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading charity information</p>;
  if (!charity) return <p>No charity found</p>;

  return (
    <div className="w-full flex flex-row flex-wrap justify-center text-black">
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
          <div>
            <label htmlFor="donation">Donation Amount ($):</label>
            <input
              className="rounded-md border-gray-200 ml-2"
              id="donation"
              type="number"
              name="price"
              placeholder="25.00"
              required
              ref={amountRef}
            />
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleDonateClick}
            disabled={loadingPayment}
          >
            {loadingPayment ? 'Processing...' : 'Donate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCheckOut;