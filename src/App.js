import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route exact element={<Home />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Create />} path="/create" />
            <Route element={<ViewPost />} path="/view" />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
