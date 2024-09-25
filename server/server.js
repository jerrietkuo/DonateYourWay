require('dotenv').config();

// Import necessary modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
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
    console.log('Received request to create checkout session');

    // Create a new checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1Q2lDdCGljRi9xVfOwvvI1m1',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel', 
    });

<<<<<<< HEAD
    console.log('Checkout session created successfully:', session.id); // Debugging log
=======
    console.log('Checkout session created successfully:', session.id);
>>>>>>> 9378f90d (add stripe payment in backend)
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Error creating checkout session' });
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
// Start Apollo server
async function startApolloServer() {
  try {
    await server.start(); // Ensure the Apollo server starts successfully
    server.applyMiddleware({ app });

=======
=======
app.get('/config', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log
    const { amount } = req.body;
    console.log('Amount Received:', amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Error creating payment intent' });
  }
});

>>>>>>> 6a54a433 (add stripe payment test)
// Set up Apollo Server
async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });

    await server.start();
    server.applyMiddleware({ app });

    // Start the Express server after the database connection is open
>>>>>>> 9378f90d (add stripe payment in backend)
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('Error starting Apollo Server or connecting to DB:', error);
=======
    console.error('Error starting Apollo Server or connecting to the database:', error);
>>>>>>> 9378f90d (add stripe payment in backend)
  }
}

startApolloServer();