import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      <span>Calificación: </span>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
        >
          &#9733; {/* Este es el código de la estrella */}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
