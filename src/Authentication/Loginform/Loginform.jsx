import React from 'react';
import "./Loginform.css";

function Loginform() {
  return (
    <div className="container">
      <div className="form">
        <div className="input-field">
          <input type="email" id="email" placeholder="email" />
        </div>
        <div className="input-field">
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className="btn-container">
          <button className="btn">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default Loginform;



