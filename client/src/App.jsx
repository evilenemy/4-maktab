import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const api = "http://localhost:8000";
  const { user } = useAuthContext();
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signup"
          element={!user ? <Signup api={api} /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login api={api} /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
