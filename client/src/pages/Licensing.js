import React from "react";

const Licensing = () => {
  return (
    <div className="p-6 bg-white text-gray-700">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Licensing</h1>

      <p className="mb-4 text-lg">
        DonateYourWay operates under various licenses to ensure compliance with applicable regulations. This page outlines the terms under which our services are licensed and distributed.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Open Source Licensing</h2>
      <p className="mb-4">
        Some components of our website are made available under open-source licenses. The following open-source software may be used in DonateYourWay:
        <ul className="list-disc ml-6 text-gray-600">
          <li>React.js – MIT License</li>
          <li>Tailwind CSS – MIT License</li>
          <li>GraphQL – MIT License</li>
          <li>Apollo Client – MIT License</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Proprietary Licensing</h2>
      <p className="mb-4">
        DonateYourWay's proprietary code, design, and content are protected under intellectual property laws. The use, distribution, or modification of proprietary elements requires explicit permission from DonateYourWay.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We may integrate third-party services as part of our platform. Each third-party service operates under its own licensing and terms of service, which users must agree to when using those services through DonateYourWay. These services include but are not limited to:
        <ul className="list-disc ml-6 text-gray-600">
          <li>Payment Gateways - Stripe Payment</li>
          <li>Hosting Services - Render</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">User Contributions</h2>
      <p className="mb-4">
        Users who submit content, such as blog posts, comments, or reviews, grant DonateYourWay a non-exclusive, royalty-free, worldwide license to use, reproduce, and distribute that content across our platform.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Attribution</h2>
      <p className="mb-4">
        Where applicable, DonateYourWay will provide attribution to open-source projects, third-party services, or user contributions. If you believe attribution is missing or incorrect, please contact us at licensing@donateyourway.com.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions about licensing, please contact us at licensing@donateyourway.com.
      </p>
    </div>
  );
};

export default Licensing;