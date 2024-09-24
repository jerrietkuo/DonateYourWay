import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, ALL_CHARITIES } from "../utils/queries";
import { SAVE_CHARITY } from "../utils/mutations";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Card = () => {
  // Get logged-in user charities
  const { data: userCharityData } = useQuery(QUERY_ME);
  const userCharityIdList = userCharityData?.me?.charities.map((charity) => charity._id) || [];

  // Get all charities
  const { data } = useQuery(ALL_CHARITIES);
  const charities = data?.charities || [];

  // Mutation to save charity
  const [saveCharity] = useMutation(SAVE_CHARITY);

  // State for category selection
  const [category, setCategory] = useState("");

  // Filter charities based on selected category
  const filteredCharities = charities.filter((charity) =>
    category ? charity.categories[0]?.name === category : true
  );

  // Handle charity saving
  const handleSubmit = async (charityId) => {
    try {
      await saveCharity({
        variables: { charityId },
      });
    } catch (error) {
      console.error("Error saving charity:", error);
    }
  };

  // Handle charity donation
  const handleDonation = (charityId) => {
    localStorage.setItem("current-charity", charityId);
    // Redirect or further logic for donation can be added here
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 py-4">
        <label htmlFor="category" className="text-grey-600 font-medium">
          Choose a category
        </label>
        <select
          onChange={(event) => setCategory(event.target.value)}
          name="category"
          id="category"
          className="rounded-lg bg-white text-indigo-700 font-bold"
        >
          <option value="">All</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Environment">Environment</option>
          <option value="LGBTQ+">LGBTQ+</option>
          <option value="Animal Welfare">Animal Welfare</option>
          <option value="Education Services">Education Services</option>
          <option value="Social/Human Rights">Social/Human Rights</option>
          <option value="Legal Services">Legal Services</option>
          <option value="Economic Development">Economic Development</option>
          <option value="Mental Healthcare">Mental Healthcare</option>
          <option value="Refugees/Immigration">Refugees/Immigration</option>
          <option value="Public Safety">Public Safety</option>
        </select>
      </div>

      <div className="flex flex-row flex-wrap justify-center space-y-6">
        {filteredCharities.map((charity) => (
          // Card for each charity
          <div
            type="card"
            data-modal-toggle="defaultModal"
            key={charity._id}
            className="max-w-sm w-96 overflow-hidden shadow-lg rounded-lg"
          >
            {/* Charity Image */}
            <img
              style={{ height: "200px" }}
              className="w-full rounded-t-lg object-cover"
              src={charity.imgLink}
              alt={charity.name}
            />
            {/* Charity Info */}
            <div className="p-4">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {charity.categories[0]?.name}
              </span>
              <h5 className="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {charity.name}
              </h5>
              <a
                href={charity.link}
                className="font-normal text-indigo-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site
              </a>
              <p className="mb-8 font-normal text-xs text-gray-700">
                EIN: {charity.ein}
              </p>
              {/* Action Buttons */}
              <div className="flex flex-row py-2">
                {/* Save Button */}
                <button
                  onClick={() => handleSubmit(charity._id)}
                  className="py-4 px-5 mr-2 mb-2 text-sm font-medium text-white bg-indigo-700 rounded-lg border hover:bg-gray-100 hover:text-indigo-700"
                >
                  {userCharityIdList.includes(charity._id) ? "Saved" : "Save"}
                </button>
                {/* Donate Button */}
                <Link to="/donation">
                  <button
                    onClick={() => handleDonation(charity._id)}
                    className="py-4 px-5 mr-2 mb-2 text-sm font-medium text-white bg-indigo-700 rounded-lg border hover:bg-gray-100 hover:text-indigo-700"
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