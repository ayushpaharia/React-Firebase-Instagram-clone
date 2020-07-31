import React, { useState, useEffect } from "react";
import "../css/Post.css";
import { Avatar, Input, Button } from "@material-ui/core";

import { db } from "../Firebase";
import firebase from "firebase";

function Post({ postId, ImageUrl, username, user, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const postSubmit = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);
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
      <div className="post-comments">
        {comments.map((comment) => {
          return (
            <p>
              <strong>{comment.username}</strong> {comment.comment}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post-comment-box">
          <Input
            className="post-comment-input"
            type="text"
            placeholder="Type you comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disabled={!comment}
            className="post-comment-button"
            type="submit"
            onClick={postSubmit}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
