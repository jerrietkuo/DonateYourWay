import React, { useEffect } from 'react';
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { ALL_CHARITIES } from "../utils/queries";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";


export default function SimpleSlider() {
  const { data } = useQuery(ALL_CHARITIES);
  const charities = data?.charities || [];

 
  // Slider settings for 3 cards visible at a time
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    
<Slider {...settings}>
  {charities.slice(10, 18).map((charity) => {
    const { _id, imgLink, name, categories, mission } = charity;

    return (
      <div key={_id} style={{ padding: "10px" }}>
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-84 overflow-hidden min-h-[400px]"> 
          {/* Image */}
          <img
            style={{ height: "160px" }} // Keep the image height consistent
            className="w-full rounded-t-lg object-cover"
            src={imgLink}
            alt={`${name} Charity`}
          />
          {/* Text */}
          <div className="p-2 flex flex-col justify-between h-full">
            <div>
              <span className="mb-1 bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-800">
                {categories[0]?.name || "Uncategorized"}
              </span>
           
<p className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden" style={{ height: '3em', lineHeight: '1.5em' }}>
  {name}
</p>
              <p className="mission font-normal text-gray-700 dark:text-gray-400 text-sm overflow-hidden">
  {mission || "No mission available"}
</p>
 {/* More Button takes you to the Explore page (and added control to take to top of page */}
 <div className="flex justify-center mt-auto">
 <Link
        to="/explore"
        className="mt-4 py-1 px-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center"
      >
        More
      </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  })}
</Slider>

  
  );
}
