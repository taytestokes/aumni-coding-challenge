import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ users, values, children }) => {
  const [user, setUser] = useState();

  /**
   * isAuthed is a quick boolean way to check if there is a user in the application state
   */
  const isAuthed = Boolean(user);

  /**
   * SignIn will validate the credentials and store the user in local storage
   * and update the application auth state with that user
   */
  const signIn = (username, password) => {
    const user = users.find((user) => user.username === username);

    if (!username.length) {
      throw new Error("Username can't be blank.");
    }

    if (!password.length) {
      throw new Error("Password can't be blank.");
    }

    if (!user) {
      throw new Error("Invalid username, please try again.");
    }

    if (password !== user.password) {
      throw new Error("Invalid password, please try again.");
    }

    const userData = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /**
   * Sign out will handle deleting the user from local storage and removing the user from
   * the application auth state
   */
  const signOut = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  /**
   * Initially check for a current user stored in local stoage, if there
   * is then that means the user should have a persistent sessions and should
   * be signed in automatically
   */
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthed,
        signIn,
        signOut,
        ...values,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  users: PropTypes.array.isRequired,
  values: PropTypes.object,
  children: PropTypes.node.isRequired,
};

AuthProvider.defalutProps = {
  values: {},
};
