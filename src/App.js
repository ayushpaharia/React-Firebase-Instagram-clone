import React, { useState, useEffect } from "react";
import "./css/App.css";
import Post from "./components/Post";
import { db, auth } from "./Firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);

  const url =
    "https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png";
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else setUser(null);
      return () => {
        //clean up
        unsubscribe();
      };
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img src={url} alt="Insta" className="modal-header-image" />
            </center>
            <Input
              placeholder="username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
            {user ? (
              <Button
                type="submit"
                onClick={() => auth.signOut()}
                children="Log Out"
              />
            ) : (
              <Button type="submit" onClick={signUp} children="Sign Up" />
            )}
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img src={url} alt="Insta" className="modal-header-image" />
            </center>

            <Input
              placeholder="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
            {user ? (
              <Button
                type="submit"
                onClick={() => auth.signOut()}
                children="Log Out"
              />
            ) : (
              <Button type="submit" onClick={signUp} children="Sign Up" />
            )}
          </form>
        </div>
      </Modal>
      <div className="app-header">
        <img src={url} alt="Insta" className="app-header-image" />
      </div>
      {user ? (
        <Button
          type="submit"
          onClick={() => auth.signOut()}
          children="Log Out"
        />
      ) : (
        <div className="app-login-container">
          <Button
            type="submit"
            onClick={() => {
              setOpenSignIn(true);
            }}
            children="Sign In"
          />
          <Button
            type="submit"
            onClick={() => {
              setOpen(true);
            }}
            children="Sign Up"
          />
        </div>
      )}
      <h1>React Instagram</h1>
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            ImageUrl={post.ImageUrl}
          />
        );
      })}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default App;
