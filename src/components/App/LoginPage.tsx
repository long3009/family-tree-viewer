import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./login.css";
import { useCookies } from "react-cookie";
export const LoginPage = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["isLogin"]);
  const handleLogin = (e: any) => {
    e.preventDefault();

    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    if (username === "user" && password === "password") {
      // Replace with actual authentication logic
      setCookie("isLogin", "true", { path: "/" });
      setAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="main">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="custom-label">
              Tên đăng nhập:
            </label>
            <input
              className="custom-input"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="custom-label">
              Mật khẩu:
            </label>
            <input
              className="custom-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="custom-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};
