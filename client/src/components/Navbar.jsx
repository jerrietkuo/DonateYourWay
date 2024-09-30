import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  const isLoggedIn = Auth.loggedIn();

  return (
      <nav className="flex flex-row-reverse items-center justify-between bg-indigo-700 p-1">
          <h1>
            <Link to="/">
              <span className="self-center text-xl p-2 font-bold whitespace-nowrap text-white">DonateYourWay</span>
            </Link>
          </h1>

          <ul className="flex flex-wrap items-end">
            {isLoggedIn ? (
            <>
              <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-semibold mr-4">
                <Link to="/explore">Explore</Link>
              </li>
              <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-semibold mr-4">
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-semibold mr-4">
                <Link to="/about">About</Link>
              </li>
            </>
            ) : (
              <></>
            )}
            
            {isLoggedIn ? (
              <li className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold mr-4">
                <a href="/" onClick={() => Auth.logout()}>Logout</a>
              </li>
            ) : (
              <li className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold mr-4">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
      </nav>
  );
}

export default Nav;