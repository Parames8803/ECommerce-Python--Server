import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ImCart } from "react-icons/im";
import { RiImageAddFill, RiLoginCircleFill } from "react-icons/ri";
import { BiSolidLogOutCircle } from "react-icons/bi";
import Axios from "axios";
import "../styles/Layout.css";

const Layout = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    token: null,
  });

  const navigate = useNavigate();

  const btnRecordStart = async () => {
    resetTimer();
    setIsRunning(true);
    setIsRecording(!isRecording);
  };

  const btnRecordStop = async () => {
    resetTimer();
    setIsRunning(false);
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setSeconds(0);
  };

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  useEffect(() => {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    setUserData({
      name: username,
      token: token,
    });
  }, [window.location.pathname]);

  return (
    <>
      <nav>
        <div className="logo">
          <span>
            <ImCart />
          </span>
          <h1>Garments</h1>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/#">Cart</Link>
          <Link to="/#">Profile</Link>
        </div>
        <div className="search">
          <input type="text" className="bar" />
          {isRecording ? (
            <button className="mikeOff" onClick={btnRecordStop}>
              <FaMicrophoneSlash />
            </button>
          ) : (
            <button className="mikeOn" onClick={btnRecordStart}>
              <FaMicrophone />
            </button>
          )}
          <div className="upload">
            <label htmlFor="img" className="imgLabel">
              <RiImageAddFill />
            </label>
            <input
              type="file"
              name="img"
              id="img"
              className="img"
              accept="image/*"
            />
          </div>
          {seconds > 0 && <p className="timer">{formatTime(seconds)}</p>}
        </div>
        <div className="auth">
          {userData.token !== null ? (
            <div className="profile_info_navbar">
              <div className="user_profile_logo">
                {userData.name[0].toUpperCase()}
              </div>
              <div className="user_profile_name">{userData.name}</div>
              <div
                className="user_logout_btn_container"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/auth");
                }}
              >
                <BiSolidLogOutCircle />
              </div>
              <p>Logout</p>
            </div>
          ) : (
            <>
              <button
                className="btnLogin"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                <RiLoginCircleFill />
                {/* <p>Login</p> */}
              </button>
              <p>Login</p>
            </>
          )}
        </div>
      </nav>
      <div className="outlet_container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
