// Import necessary modules
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const stripe = require('stripe')(process.env.STRIPE_SECRET); // Make sure you have Stripe secret key in .env
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to handle JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Catch-all handler to serve React's index.html for any route not handled by API
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Stripe Checkout session creation route
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received request to create checkout session'); // Debugging log

    // Create a new checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1Q0txpRuJlUgN68mHbkiapPp', // Replace this with your actual Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect after successful payment
      cancel_url: 'http://localhost:3000/cancel',   // Redirect if payment is canceled
    });

    console.log('Checkout session created successfully:', session.id); // Debugging log
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error); // Log the error
    res.status(500).send({ error: 'Error creating checkout session' });
  }
});

// Start Apollo server
async function startApolloServer() {
  try {
    await server.start(); // Ensure the Apollo server starts successfully
    server.applyMiddleware({ app });

    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  } catch (error) {
    console.error('Error starting Apollo Server or connecting to DB:', error);
  }
}

startApolloServer();