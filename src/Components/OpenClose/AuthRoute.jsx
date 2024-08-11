import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; // Adjust the path as needed

const AuthRoute = ({ element: Component, ...rest }) => {
  const { login } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={login ? Component : <Navigate to="/login" />}
    />
  );
};

export default AuthRoute;
