import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import '../styles/checkout.css'; 

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
        setMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log('Payment succeeded:', paymentIntent);
        setMessage("Thank you! Your donation was successful. 🎉");
      } else {
        console.log('PaymentIntent status:', paymentIntent.status);
        setMessage("Payment processing. Please wait...");
      }
    } catch (err) {
      console.error('Exception during payment confirmation:', err);
      setMessage('An error occurred during payment processing.');
    }

    setIsProcessing(false);

    // Redirect to homepage after 3 seconds
    setTimeout(() => {
      window.location.href = `${window.location.origin}/`;
    }, 3000);
  };

  return (
    <div className="checkout-body">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}