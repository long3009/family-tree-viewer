import React, { useContext, useEffect } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const [cookies, setCookie] = useCookies(["isLogin"]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("cookies.isLogin", cookies.isLogin);
    if (cookies.isLogin) {
      setAuthenticated(true);
      navigate("/");
    }
  }, [cookies]);

  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Router>
  );
};

export default Routes;
