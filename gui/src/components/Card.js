import React from "react";
import "../styles/app.css";
function Card({ name, teacher, cover }) {
  return (
    <>
      <div className="card__img">
        <img src={`http://localhost:8000${cover}`} alt="img" />
      </div>
      <div className="card__detail">
        <h5>{name}</h5>
        <p>{teacher}</p>
      </div>
    </>
  );
}

export default Card;
