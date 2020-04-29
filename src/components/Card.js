import React from "react";
export const Card = ({ track }) => {
  return (
    <div className="card">
      <img src={track.albumArt} alt="" />
      <div className="content">
        <h2>{track.name}</h2>
        <span>BY: {track.artist}</span>
      </div>
    </div>
  );
};
export default Card;
