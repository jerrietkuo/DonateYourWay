import React from "react";

import { Link } from "react-router-dom";
import Auth from "../utils/auth";




function Header() {
  const isLoggedIn = Auth.loggedIn();
  return (
    <div className="py-2 sm:py-4 overflow-y-hidden">
      <dh-component>
        <div className="w-full px-4 justify-center">
          <div className="mt-1 relative rounded-lg container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
            <div className="mt-2 w-11/12 sm:w-2/3 mb-1 sm:mb-2">
              {/* <h1
                style={{ textTransform: "uppercase" }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-white font-bold leading-tight"
              >
                Value your verity
              </h1> */}
              <h3 className="text-base sm:text-lg text-white font-bold leading-tight py-2">
                {" "}
                Build your own charitable portfolio{" "}
              </h3>
            </div>
            <div className="flex justify-center items-center mb-8 sm:mb-10">
              {isLoggedIn ? (
                <Link
                  to="/explore"
                  className="py-2.5 px-4 mr-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Start Donating Today
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="py-1 px-5 mr-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Start Donating Today
                </Link>
              )}
            </div>
           
          </div>
        </div>
      </dh-component>
    </div>
  );
}

export default Header;
