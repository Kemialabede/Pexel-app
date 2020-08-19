import React from "react";
import "../../scss/VideoContent.scss";

function VideoContent(props) {
  return (
    <div className="video">
      {props.name}
      {props.link}
      {props.url}
    </div>
  );
}

export default VideoContent;
