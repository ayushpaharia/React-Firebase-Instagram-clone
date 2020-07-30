import React from "react";
import "../css/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ ImageUrl, username, caption }) {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar
          className="post-avatar"
          alt={username[0].toUpperCase()}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post-image" src={ImageUrl} alt="food" />
      <h4 className="post-details">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Post;
