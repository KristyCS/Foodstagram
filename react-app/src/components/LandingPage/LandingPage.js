import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { login } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import "./LandingPage.css";
const LandingPage = () => {
  const dispatch = useDispatch();
  const credential = "demo@demo.com";
  const password_demo = "password";
  const credential2 = "user@demo.com";
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);
  return (
    <div className="landing-container">
      <div className="blank"></div>
      <div className="login">
        <p className="home-link">Foodstagram</p>
        {openSignUp && <SignUpForm />}
        {openLogin && (
          <>
            <LoginForm />
            <button onClick={() => dispatch(login(credential, password_demo))}>
              Login As Demo User1
            </button>
            <button onClick={() => dispatch(login(credential2, password_demo))}>
              Login As Demo User2
            </button>
            <div className="suggest-sign-up">
              <p>Don't have an account?</p>
              <p
                className="sign-up"
                onClick={() => {
                  setOpenSignUp(true);
                  setOpenLogin(false);
                }}
              >
                Sign Up
              </p>
            </div>
          </>
        )}
        <div className="story">
          <img
            onClick={() => (window.location = "https://github.com/Changh341")}
            src="https://avatars.githubusercontent.com/u/83061284?v=4"
            alt="Author1"
          />
          <img
            onClick={() =>
              (window.location = "https://github.com/LakshmiPriyaPrakash")
            }
            src="https://media.discordapp.net/attachments/904858208127057970/908825913418981476/me.jpg"
            alt="Author2"
          />
          <img
            onClick={() => (window.location = "https://github.com/AftonSlone")}
            src="https://avatars.githubusercontent.com/u/8993588?v=4"
            alt="Author3"
          />
          <img
            onClick={() => (window.location = "https://github.com/KristyCS")}
            src="https://avatars.githubusercontent.com/u/3848107?v=4"
            alt="Kristy"
          />
        </div>
      </div>
      )
    </div>
  );
};
export default LandingPage;
