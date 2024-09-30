import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Modal from "./Modal";
import { UNSAVE_CHARITY } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const Card = () => {
  // usequery for getting all charities for the logged-in user
  const { data } = useQuery(QUERY_ME);
  const charities = data?.me?.charities || [];
  const [unSaveCharity] = useMutation(UNSAVE_CHARITY);

  // When user clicks on the "Unsave" button, the charity is removed from the user's list
  const handleSubmit = async (event) => {
    const charityId = event.target.value; // Get charityId directly from button's value

    try {
      const { data } = await unSaveCharity({
        variables: {
          charityId, // Pass charityId directly here
        },
      });
      console.log("Unsave successful:", data);
    } catch (error) {
      console.error("Error unsaving charity:", error);
    }
  };

  const handleDonation = (event) => {
    localStorage.setItem("current-charity", event.target.value);
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center justify-between space-y-4" >
        {/* Filter Applied */}
        {charities.map((charity) => (
          // Card
          <div
            type="card"
            data-modal-toggle="defaultModal"
            key={charity._id}
            className="max-w-sm w-90 rounded overflow-hidden shadow-lg rounded-lg"
            style={{ backgroundColor: "#eff6ff" }}
          >
            {/* Image */}
            <img
              style={{ height: "200px" }}
              className="w-full rounded-t-lg object-cover"
              src={charity.imgLink}
              alt=""
            />
            {/* Text */}
            <div className="p-4">
              <h5 className="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {charity.name}
              </h5>
              <a
                href={charity.link}
                className="font-normal text-indigo-400 dark:text-gray-400"
              >
                Visit Site
              </a>
              <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                EIN: {charity.ein}
              </p>
              <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                {charity.location}
              </p>
              {/* CTAs */}
              <div className="flex flex-row py-2">
                {/* Unsave Button */}
                <button
                  id={charity._id}
                  value={charity._id}
                  name="charityId"
                  onClick={handleSubmit} // Handle unsave directly
                  className="py-4 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-indigo-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-indigo-700 dark:hover:bg-gray-700"
                >
                  Unsave
                </button>
                {/* Added Link button to route donation page*/}
                <Link to="/donation">
                  <button
                    id="donation"
                    value={charity._id}
                    name="charityId"
                    onClick={handleDonation}
                    className="py-4 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-indigo-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-indigo-700 dark:hover:bg-gray-700"
                  >
                    Donate
                  </button>
                </Link>

                {/* Modal Button */}
                <Modal charityId={charity._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;