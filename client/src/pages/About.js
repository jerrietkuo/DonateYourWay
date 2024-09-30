import React from "react";

function About() {
  return (
    <div  style={{ minHeight: "90vh", backgroundColor: "#93c5fd" }}>
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-10 max-w-3xl w-11/12 md:w-2/3 rounded-lg shadow-md border" style={{ backgroundColor: "#eff6ff" }}>
        <h1 className="text-3xl sm:text-4xl font-serif text-center text-black mb-8 mt-6" >
          Our Mission 🌍
        </h1>
        <div className="font-serif text-lg leading-relaxed space-y-6 px-4"> {/* Added px-4 for left/right padding */}
          <p>
            We all want to make a difference, but as we navigate countless requests from charities, and social media has us overwhelmed by the sheer volume of causes that need your support, we become victims of indecision.
          </p>

          <p>
            Not to mention the effort of trying to track donations, and manage tax deductions. All of which lead to barriers that discourage giving. Recognizing these challenges, we developed a solution: an app that transforms the way people donate.
          </p>

          <p>
            With <strong>DonateYourWay</strong>, generous donors log in to a personalized dashboard where a simple search bar allows them to explore causes they are passionate about. They can easily keep track of their favorite charities and donate with confidence and ease. 🕊️ 
          </p>

          <p>
            Plus, the app seamlessly integrates a Stripe payment portal, allowing donations to be made in one spot, safely and securely 🔒. All charities are vetted, and detailed information is provided, ensuring users can give with confidence. While the app effortlessly tracks donations for seamless tax reporting.
          </p>

          <p>
            In a world where every little bit counts, <strong>DonateYourWay</strong> makes it easy to make the world a better place—one donation at a time!
          </p>

          <p>
            Sincerely,</p>
               <p>Jerriet, Pritam and Kim 🌟
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
