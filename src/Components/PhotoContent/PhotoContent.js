import React from "react";
import "../../scss/PhotoContent.scss";

function PhotoContent(props) {
  return (
    <div className="photo-content">
      {props.image}
      <div>
        <p>{props.name}</p>
        <a href="#">{props.url}</a>
      </div>
    </div>
  );
}

export default PhotoContent;
