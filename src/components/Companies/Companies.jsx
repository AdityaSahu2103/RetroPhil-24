import React from "react";
import "./Companies.css";

const Companies = () => {
  return (
    <div>
      <section className="c-wrapper">
        <div className="paddings innerWidth flexCenter c-container">
        <a href="https://www.indiaculture.nic.in"><img src="cul.png" alt="" width="120"/></a>

          <a href="https://www.indiapost.gov.in">
            <img src="./indianPost.png" alt="" width="120" />
          </a>
          <a href="https://dot.gov.in"><img src="./MOC.png" alt="" width="120" /></a>
          <a href="https://www.indiapost.gov.in/Philately/Pages/NationalPhilatelicMuseum.aspx"><img src="./museum.png" width="120" alt="" /></a>
          <a href=""></a>
        </div>
      </section>
    </div>
  );
};

export default Companies;
