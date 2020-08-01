import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import { db, auth } from "./Firebase";
import MyModal from "./components/MyModal";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import InstagramEmbed from "react-instagram-embed";
import { FaReact } from "react-icons/fa";
import "./css/App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  //For icon rotation
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rotation === 359) {
        setRotation(0);
      } else {
        setRotation(rotation + 1);
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  });
  let rotationAngle = `${rotation}deg`;
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
      <div className="app-title-bar">
        <h1 className="app-title">React Instagram clone</h1>
        <FaReact
          color="#0DD1F7"
          size="2.5em"
          style={{ transform: `rotate(${rotationAngle})` }}
        />
      </div>
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
          <div className="image-upload-box">
            <h3 className="Info-Title">INFO</h3>
            <h3 className="Info">
              Instagram Embed Feature does'nt work on Firefox. If the Page
              freaks out the user is already created if page breaks contact me
              at ayush.paharia.18@gmail.com Thank you.
            </h3>
          </div>
          <div className="image-upload-box">
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3 className="image-upload-title">Login to Upload</h3>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
