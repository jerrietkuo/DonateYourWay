import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 bg-white text-gray-700">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Privacy Policy</h1>

      <p className="mb-4 text-lg">
        Welcome to DonateYourWay's Privacy Policy. Your privacy is critically important to us. This policy explains what information we collect, how we use it, and the choices you have regarding your information.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect information in the following ways:
        <ul className="list-disc ml-6 text-gray-600">
          <li><strong>Information you provide:</strong> When you sign up for our services, make a donation, or contact us, we collect information such as your name, email address, and payment information.</li>
          <li><strong>Automatically collected information:</strong> We automatically collect certain information about your device and interaction with our services, such as your IP address, browser type, and operating system.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">How We Use Information</h2>
      <p className="mb-4">
        We use the information we collect to:
        <ul className="list-disc ml-6 text-gray-600">
          <li>Provide and improve our services.</li>
          <li>Process donations and payments securely.</li>
          <li>Communicate with you about your account or donations.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Sharing Your Information</h2>
      <p className="mb-4">
        We do not share your personal information with third parties except in the following situations:
        <ul className="list-disc ml-6 text-gray-600">
          <li>With your consent.</li>
          <li>To comply with legal requirements or to protect our rights.</li>
          <li>To third-party service providers that assist with our operations (e.g., payment processors).</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. You may also object to the processing of your data or request data portability. To exercise these rights, please contact us at support@donateyourway.com.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Security</h2>
      <p className="mb-4 text-gray-600">
        We take the security of your information seriously and use industry-standard practices to protect it. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Changes to This Policy</h2>
      <p className="mb-4 text-gray-600">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of any significant changes via email or through our website.
      </p>

      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Contact Us</h2>
      <p className="text-gray-600">
        If you have any questions about this Privacy Policy, please contact us at support@donateyourway.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;