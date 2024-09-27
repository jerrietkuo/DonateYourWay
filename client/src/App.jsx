import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Donation from "./pages/Donation";
import Explore from "./pages/Explore";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Licensing from "./pages/Licensing";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/licensing" element={<Licensing />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
