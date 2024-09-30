import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="p-1 shadow md:flex md:items-center md:justify-between md:p-1 bg-indigo-700" >
            <span className="text-sm text-white sm:text-center dark:text-white">
                © 2024 <Link to="/" className="mr-2 hover:underline md:mr-2">DonateYourWay™.</Link> All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-white  sm:mt-0 space-x-4">
                <li>
                    <Link to="/about" className="mr-2 hover:underline md:mr-3">About</Link>
                </li>
                <li>
                    <Link to="/privacy-policy" className="mr-3 hover:underline md:mr-3">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/licensing" className="mr-2 hover:underline md:mr-3">Licensing</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;