import React from "react";
import "./Card.css";

export default function Card(props) {
  const handleClick = () => {
    props.handleChoice(props.card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={props.card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
