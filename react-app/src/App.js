import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage/index";
import SinglePostDetails from "./components/SinglePostDetails";
import { authenticate } from "./store/session";
import UserProfile from "./components/UserProfile";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [confirmBoolean, setConfirmBoolean] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar
        confirmBoolean={confirmBoolean}
        setConfirmBoolean={setConfirmBoolean}
      /> */}
      <Switch>
        <Route path="/login" exact={true}>
          <LandingPage />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/posts/:postId">
          <SinglePostDetails />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <NavBar
            confirmBoolean={confirmBoolean}
            setConfirmBoolean={setConfirmBoolean}
          />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar
            confirmBoolean={confirmBoolean}
            setConfirmBoolean={setConfirmBoolean}
          />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <NavBar
            confirmBoolean={confirmBoolean}
            setConfirmBoolean={setConfirmBoolean}
          />
          <HomePage />
        </ProtectedRoute>
        <Route path="/users/dashboard/:username" exact={true}>
          <NavBar
            confirmBoolean={confirmBoolean}
            setConfirmBoolean={setConfirmBoolean}
          />
          <UserProfile confirmBoolean={confirmBoolean} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
