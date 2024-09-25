import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import '../styles/checkout.css'; 

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsProcessing(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Optionally send additional information to Stripe
        return_url: `${window.location.origin}/portfolio`,
      },
    });
  
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment succeeded!");
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