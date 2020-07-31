import React, { useState } from "react";
import { Input, Button, LinearProgress, Typography } from "@material-ui/core";
import { storage, db } from "../Firebase";
import firebase from "firebase";
import "../css/ImageUpload.css";
function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProgressBarVisible, setProgressBarVisible] = useState(false);
  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };
  const handleUpload = () => {
    setProgressBarVisible(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Progress Bar
        let progress = snapshot.bytesTransferred / snapshot.totalBytes;

        setProgress(progress);
      }, //error handling
      (err) => {
        console.log(err);
      }, // upload complete
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              ImageUrl: url,
              username: username,
            });
            setProgress(0);
            setTimeout(setProgressBarVisible(false), 1000);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="image-upload">
      <h3 className="image-upload-title">Image Upload</h3>
      {isProgressBarVisible ? (
        <div className="upload-progress-bar">
          <LinearProgress
            className="image-upload-progress"
            variant="determinate"
            value={progress}
          />
          <Typography
            className="upload-progress-text"
            variant="body2"
            color="textSecondary"
          >{`${Math.round(progress * 100)}%`}</Typography>
        </div>
      ) : null}
      <Input
        className="image-upload-input-text"
        type="text"
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input
        className="image-upload-input-file"
        type="file"
        onChange={handleChange}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
