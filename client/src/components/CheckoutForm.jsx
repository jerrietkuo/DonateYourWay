import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';
import { USER_SUMMARY } from '../utils/queries'; // Import the query to refetch
import '../styles/checkout.css';

export default function CheckoutForm({ onPaymentSuccess, onMessage, charityId, donationAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentElement, setShowPaymentElement] = useState(true);

  const [addDonation] = useMutation(ADD_DONATION, {
    refetchQueries: [{ query: USER_SUMMARY }], // Refetch user summary after donation
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe or Elements not loaded');
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        console.error('Error during payment confirmation:', error);
        onMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log('Payment succeeded:', paymentIntent);
        onMessage("Thank you! Your donation was successful. 🎉");

        // Call the addDonation mutation here
        try {
          const { data } = await addDonation({
            variables: {
              donationAmount: donationAmount / 100, // Convert back to dollars
              donationDate: new Date().toISOString(),
              charity: charityId,
            },
          });
          console.log('Donation saved:', data.addDonation);

          // Notify parent component that payment and donation saving were successful
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }

        } catch (err) {
          console.error('Error saving donation:', err);
          onMessage('Donation could not be saved. Please try again.');
        }

        // Reset the Payment Element if needed
        setShowPaymentElement(false);
        setTimeout(() => {
          setShowPaymentElement(true);
        }, 0);
      } else {
        console.log('PaymentIntent status:', paymentIntent.status);
        onMessage("Payment processing. Please wait...");
      }
    } catch (err) {
      console.error('Exception during payment confirmation:', err);
      onMessage('An error occurred during payment processing.');
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        {showPaymentElement && <PaymentElement id="payment-element" />}
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ..." : "Pay now"}
          </span>
        </button>
      </form>
    </div>
  );
}