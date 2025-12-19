import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>

        {/* Navbar visible partout */}
        <Navbar />

        {/* Wrapper pour compenser le Navbar et le Footer fixes */}
        <div className="w-full pt-[70px] pb-[70px] min-h-screen flex flex-col justify-center bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>

        {/* Footer visible partout */}
        <Footer />

      </Router>
    </AuthProvider>
  );
}

export default App;

