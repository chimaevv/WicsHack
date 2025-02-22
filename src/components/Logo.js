import React from "react";
import "./../index.css"; // Ensure correct path to CSS

const Logo = () => {
  return (
    <div className="logo-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1298/1298030.png"
        alt="Gem Logo"
      />
     <img
  src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
  alt="Magnifying Glass"
  className="magnifying-glass"
  style={{ width: "100px", height: "100px" }} // Forces a smaller size
/>

    </div>
  );
};

export default Logo;
