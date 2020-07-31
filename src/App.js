import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import { db, auth } from "./Firebase";
import MyModal from "./components/MyModal";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import InstagramEmbed from "react-instagram-embed";
import "./css/App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
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
    setOpen(false);
  };
  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message);
    });
    setOpenSignIn(false);
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
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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
      {/* SignUp Modal */}
      <MyModal
        username={username}
        user={user}
        auth={auth}
        signUp={signUp}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        url={url}
        open={open}
        setOpen={setOpen}
        forButton={"signup"}
      />
      {/* SignIn Modal */}
      <MyModal
        username={username}
        user={user}
        auth={auth}
        signIn={signIn}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        url={url}
        open={openSignIn}
        setOpen={setOpenSignIn}
        forButton={"signin"}
      />
      <Header
        auth={auth}
        setOpenSignIn={setOpenSignIn}
        setOpen={setOpen}
        url={url}
        user={user}
      />
      <h1 className="app-title">React Instagram clone</h1>
      <div className="app-posts">
        <div className="app-posts-left">
          {posts.map(({ id, post }) => {
            return (
              <Post
                postId={id}
                key={id}
                user={user}
                username={post.username}
                caption={post.caption}
                ImageUrl={post.ImageUrl}
              />
            );
          })}
        </div>
        <div className="app-posts-right">
          <InstagramEmbed
            url="https://www.instagram.com/p/B6lOMO0Fv-9/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          {/* {Make a post} */}
          <div className="image-upload-box">
            {user ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3 className="image-upload-title">Login to Upload</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
