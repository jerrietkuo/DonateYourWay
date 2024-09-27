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
      success_url: '/success',
      cancel_url: '/cancel', 
    });

    console.log('Checkout session created successfully:', session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Error creating checkout session' });
  }
});

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