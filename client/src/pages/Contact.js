import React from 'react';
import ProfileCard from "../components/ProfileCard";  

// Example array of project data
const profiles = [
  {
    title: "Jerriet Kuo",
    image: "/comp3.png", 
    text: "Committed to delivering quality solutions.",
    github: "https://github.com/jerrietkuo", 
  },
  {
    title: "Pritam Sur",
    image: "/comp2.png", 
    text: "I am passionate about building innovative solutions.",
    github: "https://github.com/surpritam", 
  },
  {
    title: "Kim Desveaux",
    image: "/image1comp.png",
    text: "Let's work together to bring your vision to life and make it a reality.",
    github: "https://github.com/KimCBNS", // Add your GitHub link
  },
];

function Contact() {
  return (
     <div  style={{ minHeight: "100vh", backgroundColor: "#93c5fd" }}>
    


    <div className="contact-page">
      <h1 className="mt-10 mb-2 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h1>
      <div className="portfolio-cards">
        {/* Using map() to render ProfileCard for each profile */}
        {profiles.map((profile, index) => (
          <ProfileCard profile={profile} key={index} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Contact;
