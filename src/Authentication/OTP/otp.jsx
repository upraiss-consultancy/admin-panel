import React from "react";
import "./otp.css";


const Otp = () => {
  return (
    <div className="container">
      <div className="box">
        {/* <div className="otp">OTP</div> */}
        <div className="input-field">
          <input type="text" placeholder="OTP" />
        </div>

        <div className="resend">RESEND? 30 sec</div>
        <div className="button-box">
          <button className="back">BACK</button>
          <button className="next">NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default Otp;