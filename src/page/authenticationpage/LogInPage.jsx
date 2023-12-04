import React, { useEffect, useState } from "react";
import "./AuthenticationPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../components/utils/requestAPI";

const LogInPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [authen, setAuthen] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "/api/User/login";
    const data = {
      userName: username,
      password: password,
    };
    setIsLoading(true);
    try {
      console.log(data);
      const response = await api.post(url, data);
      console.log(response.data);
      localStorage.setItem("Authen", response.data);
      setAuthen(response.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

    if (isLoading) {
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        var decode = jwtDecode(authen);
        var userid = decode.userid;
        const url = "/api/User/get-user-information";
        const headers = {
          accept: "*/*",
          "Content-Type": "application/json-patch+json",
        };
        const data = {
          userID: userid,
        };
        const response = await api.post(url, data);
        var user = response.data;
        setAuth({ user, authen });
        if (user.roleId === "4") {
          console.log("ys");
          navigate("/user-page");
        }
        if (user.roleId === "1") {
          navigate("/admin-page");
        }
        if (user.roleId === "2") navigate("/manager-page");
        if (user.roleId === "3") navigate("/staff-page");
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [authen]);

  return (
    <div className="authentication-section">
      <a href="/home" className="homepage-link">
        {" "}
        Về trang chủ
      </a>
      <div className="authentication-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-input-container">
            <label
              htmlFor="email"
              className="authentication-input-container-label"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="authentication-input"
              placeholder="Tên đăng nhập"
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="authentication-input-container">
            <label
              htmlFor="password"
              className="authentication-input-container-label"
            >
              Mật khẩu
            </label>
            <div className="input-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="authentication-input"
                placeholder="Mật khẩu"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="log-in-password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* <Link to="/question/forgot-pass" className="forgot-password-link">
            Quên mật khẩu?
          </Link> */}
          <button type="submit" className="authentication-button">
            Đăng nhập
          </button>
        </form>
        <p>
          Chưa có tài khoản đăng nhập? <Link to="/sign-up">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
