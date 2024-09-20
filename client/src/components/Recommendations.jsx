import React from "react";
import CardRec from "./CardRec";
import { QUERY_ME, ALL_CHARITIES } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Recommendations = () => {
  const { data, loading, error } = useQuery(QUERY_ME);
  const { data: allCharities } = useQuery(ALL_CHARITIES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading recommendations.</p>;
  }

  // Use optional chaining to safely access 'me'
  const savedCharities = data?.me?.charities || [];

  return (
    <div className="rounded-lg px-4">
      <h1 className="mt-10 py-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Recommendations
      </h1>
      {/* Render recommended charities */}
      {savedCharities.length > 0 ? (
        savedCharities.map((charity) => (
          <CardRec key={charity._id} charity={charity} />
        ))
      ) : (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );
};

export default Recommendations;