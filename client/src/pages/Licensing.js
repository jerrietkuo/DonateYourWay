import React from "react";

const Licensing = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#93c5fd" }}>
      <div className="items-center justify-center py-12 px-4 py-10">
        <div
          className="pt-5 pb-5 pl-10 pr-10 rounded-lg shadow-md border mx-5 my-55"
          style={{
            background: "#eff6ff",
            width: 'calc(100% - 20px)', 
            paddingRight: '15px', 
          }}
        >
          <div
            className="test mx-auto max-w-3xl p-10 my-10" // Center the div and add padding
        
          >
            <h1 className="text-4xl font-bold mb-6">Licensing</h1>

            <p className="mb-4">
              DonateYourWay operates under various licenses to ensure compliance
              with applicable regulations. This page outlines the terms under
              which our services are licensed and distributed.
            </p>

            <h2 className="text-2xl font-bold mb-2">Open Source Licensing</h2>
            <p className="mb-4"> 
              Some components of our website are made available under open-source
              licenses. The following open-source software may be used in
              DonateYourWay:
              <ul className="list-disc ml-6">
                <li>React.js – MIT License</li>
                <li>Tailwind CSS – MIT License</li>
                <li>GraphQL – MIT License</li>
                <li>Apollo Client – MIT License</li>
              </ul>
            </p>

            <h2 className="text-2xl font-bold mb-2">Proprietary Licensing</h2>
            <p className="mb-4">
              DonateYourWay's proprietary code, design, and content are protected
              under intellectual property laws. The use, distribution, or
              modification of proprietary elements requires explicit permission
              from DonateYourWay.
            </p>

            <h2 className="text-2xl font-bold mb-2">Third-Party Services</h2>
            <p className="mb-4">
              We may integrate third-party services as part of our platform. Each
              third-party service operates under its own licensing and terms of
              service, which users must agree to when using those services through
              DonateYourWay. These services include but are not limited to:
              <ul className="list-disc ml-6">
                <li>Payment Gateways - Stripe Payment</li>
                <li>Hosting Services - Render</li>
              </ul>
            </p>

            <h2 className="text-2xl font-bold mb-2">User Contributions</h2>
            <p className="mb-4"> 
              Users who submit content, such as blog posts, comments, or reviews,
              grant DonateYourWay a non-exclusive, royalty-free, worldwide license
              to use, reproduce, and distribute that content across our platform.
            </p>

            <h2 className="text-2xl font-bold mb-2">Attribution</h2>
            <p className="mb-4"> 
              Where applicable, DonateYourWay will provide attribution to
              open-source projects, third-party services, or user contributions.
              If you believe attribution is missing or incorrect, please contact
              us at licensing@donateyourway.com.
            </p>

            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="mb-4"> 
              If you have any questions about licensing, please contact us at
              licensing@donateyourway.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licensing;
