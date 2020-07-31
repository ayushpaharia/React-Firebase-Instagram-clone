import React from "react";
import { Button } from "@material-ui/core";

const Header = ({ url, user, auth, setOpen, setOpenSignIn }) => {
  return (
    <div className="app-header">
      <img src={url} alt="Insta" className="app-header-image" />
      {user ? (
        <div className="app-login-container">
          <Button
            type="submit"
            onClick={() => auth.signOut()}
            children="Log Out"
          />
        </div>
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
    </div>
  );
};

export default Header;
