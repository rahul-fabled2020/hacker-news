import React from "react";

function Comment(props) {
  return (
    <div className="comments__item">
      {props.by && (
        <div className="comments__author">
          {props.by}{" "}
          <span className="comments__date">
            {new Date(props.time).toLocaleTimeString()}
          </span>
        </div>
      )}
      <div className="comments__text" dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  );
}

export default Comment;
