import React, { useState } from "react";
import { Input, Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function MyModal({
  url,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  user,
  auth,
  signUp,
  signIn,
  setOpen,
  open,
  forButton,
}) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const modalFor = forButton === "signup";
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
        <form className="app-signup">
          <center>
            <img src={url} alt="Insta" className="modal-header-image" />
          </center>
          {modalFor ? (
            <Input
              placeholder="username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : null}
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
            <Button
              type="submit"
              onClick={modalFor ? signUp : signIn}
              children={forButton}
            />
          )}
        </form>
      </div>
    </Modal>
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
export default MyModal;
