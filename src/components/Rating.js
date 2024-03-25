import React from "react";
import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

export default function Rating({ value = 0 }) {
  return (
    <div>
      {RATINGS.map((rating) => (
        <Star key={rating} selected={value >= rating} />
      ))}
    </div>
  );
}

function Star({ selected = false }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;
  return <span className={className}>★</span>;
}
