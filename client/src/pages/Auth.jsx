import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaTelegramPlane, FaRegEyeSlash } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { toast } from "sonner";

import "../styles/Auth.css";

const Auth = () => {
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, toggleLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth", {
        isLogin,
        username: isLogin ? "" : username,
        email,
        password: pass,
      });

      if (response.status === 200) {
        // Successful login or registration
        let { username, token } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", username);
        navigate("/"); // Redirect to dashboard or desired page
      } else {
        // Handle other response statuses
        toast.warning(response.data.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="admin_login_form_container_wrapper">
      <div className="admin_login_form_container">
        <div className="admin_login_form_title">
          {isLogin ? "Login to" : "Create"} your Account
        </div>
        <div className="admin_login_input_container_wrapper">
          {!isLogin && (
            <div className="admin_login_email_input_container">
              <span className="admin_login_input_label">Username</span>
              <div className="admin_login_input_container">
                <MdOutlineAlternateEmail className="material_symbols_outlined" />
                <input
                  type="text"
                  placeholder="@username"
                  value={username}
                  className="admin_login_input_container_input"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="admin_login_email_input_container">
            <span className="admin_login_input_label">Email</span>
            <div className="admin_login_input_container">
              <FaTelegramPlane className="material_symbols_outlined" />
              <input
                type="email"
                placeholder="useremail@gmail.com"
                value={email}
                className="admin_login_input_container_input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="admin_login_password_input_container">
            <span className="admin_login_input_label">Password</span>
            <div className="admin_login_input_container">
              <CiLock className="material_symbols_outlined" />
              <input
                type={passwordVisible ? "text" : "password"}
                value={pass}
                placeholder="********"
                className="admin_login_input_container_input"
                onChange={(e) => setPass(e.target.value)}
              />
              {passwordVisible ? (
                <GrView
                  className="view_icon_admin_login"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                <FaRegEyeSlash
                  className="view_icon_admin_login"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </div>
          </div>
        </div>
        {errMsg && <div className="container_error_message">{errMsg}</div>}
        <div className="admin_login_bottom_container">
          <button onClick={handleLogin} className="admin_login_submit_btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
        <div className="signup_content_container">
          <div className="signup_content_text">
            {isLogin ? "Don't have an Account ?" : "Already have an Account ?"}
          </div>
          <Link
            onClick={() => {
              toggleLogin((prev) => !prev);
              setErrMsg(""); // Clear error message when toggling login/register
            }}
            className="switch_container_link"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
