// import React from "react";

// import Card from "../components/Card";

// const Explore = () => {
//   return (
//     <div className="explore">
//       <div className="container mx-auto px-1">
//         <Card />
//       </div>
//     </div>
//   );
// };

// export default Explore;

import React, { useEffect } from "react"; // Import useEffect
import Card from "../components/Card";

const Explore = () => {
  useEffect(() => {
    // Scroll to the top of the page on mount
    window.scrollTo(0, 0);
  }, []); // This effect runs only once when the component mounts

  return (
    <div className="explore">
      <div className="container mx-auto px-1">
        <Card />
      </div>
    </div>
  );
};

export default Explore;
