import React from "react";
import "./info.style.css";
import infoImage from "@/assets/info-img.jpg";

const Info = () => {
  return (
    <div className="points-container">
      <div className="points-image-container">
        <img src={infoImage} alt="Points" />
      </div>
      <div className="points-content">
        <div className="points-box">
          <div className="points-header">
            <h2>
              GENERATE RECIPE FROM YOUR INGREDIENTS AND SHARE YOUR RECIPE WITH
              US
            </h2>
          </div>
          <div className="points-text">
            <p>
              Discover mouthwatering recipes that are delicious help you reduce
              food waste. Submit your recipe to win amazing rewards.
            </p>
          </div>
          <div className="points-button-container">
            <button className="points-button">DISCOVER RECIPES</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

// import infoImage from "@/assets/info-img.jpg";
// import { Button } from "@/components/ui/button";
// import "./info.style.css";

// const Info = () => {
//   return (
//     <>
//       <section className="info-section lg:max-w-screen-2xl mx-auto">
//         <div className="info-grid">
//           <div className="info-image-container">
//             <img
//               className="info-image"
//               src={infoImage}
//               alt="Discounted Items"
//             />
//           </div>
//           <div className="info-text-container  bg-gradient-to-r from-[#D9D9D94D] to-[#7373734D] p-5 rounded">
//             <h2 className="info-title">
//               GENERATE RECIPE FROM YOUR INGREDIENTS AND SHARE YOUR RECIPE WITH
//               US
//             </h2>
//             <p className="info-description">
//               Discover mouthwatering recipes that are delicious help you reduce
//               food waste. Submit your recipe to win amazing rewards.
//             </p>
//             <div className="info-button-container">
//               <Button size={"lg"} className="info-button">
//                 Discover Recipes
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="info-ready-section">
//           <h1 className="info-ready-title">are you ready?</h1>
//           <p className="info-ready-subtitle">
//             SHAPE <br />
//           </p>
//           <p className="info-ready-subtitle">A sustainable WORLD! </p>
//           <div className="info-ready-button-container">
//             <button className="info-ready-button">GET STARTED</button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Info;
