import React from "react"; 

function ProfileCard({ profile }) {
  return (
    <div className="card">
      <img src={profile.image} alt={profile.title} className="card-image" />
      <h2 className="mt-8 mb-2 text-xl font-bold tracking-tight text-gray-900">{profile.title}</h2>
      <h5>{profile.text}</h5>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="github-link">
        GitHub Profile
      </a>
    </div>
  );
}

export default ProfileCard;
