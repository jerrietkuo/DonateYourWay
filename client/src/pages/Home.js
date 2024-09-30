import React from "react";


import Header from "../components/Header";
import Slider from "../components/Slider";

export default function Home() {
  return (
    // <div
    //   className="home"

    // >
    //   <div className="container mx-auto px-1 bg-softGreen">
    <div
    style={{ minHeight: "100vh", backgroundColor: "#93c5fd" }}
  >
    <div className="container mt-4 mx-auto px-1">
        <Header />
        <Slider />
      </div>
    </div>
  );
}
