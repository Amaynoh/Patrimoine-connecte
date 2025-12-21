import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>

        {/* Navbar visible partout */}
        <Navbar />

        {/* Wrapper pour compenser le Navbar fixe */}
        <div className="w-full pt-[70px] min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* Footer visible partout */}
        <Footer />

      </Router>
    </AuthProvider>
  );
}

export default App;

