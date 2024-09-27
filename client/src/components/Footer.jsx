import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2024 <a href="https://flowbite.com/" className="hover:underline">DonateYourWay™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 space-x-4">
                <li>
                    <Link to="/about" className="mr-4 hover:underline md:mr-6">About</Link>
                </li>
                <li>
                    <Link to="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/licensing" className="mr-4 hover:underline md:mr-6">Licensing</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;