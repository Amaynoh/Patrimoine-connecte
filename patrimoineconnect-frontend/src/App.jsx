import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import Opportunites from "./pages/Opportunites";
import CreateOpportunite from "./pages/CreateOpportunite";
import EditOpportunite from "./pages/EditOpportunite";
import OpportuniteDetail from "./pages/OpportuniteDetail";
import Annuaire from "./pages/Annuaire";
import ProfilPublic from './pages/ProfilPublic';
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="w-full pt-[70px] min-h-screen flex flex-col bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opportunites" element={<Opportunites />} />
          <Route
            path="/opportunites/create"
            element={
              <ProtectedRoute>
                <CreateOpportunite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunites/edit/:id"
            element={
              <ProtectedRoute>
                <EditOpportunite />
              </ProtectedRoute>
            }
          />
          <Route path="/opportunites/:id" element={<OpportuniteDetail />} />
          <Route path="/annuaire" element={<Annuaire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/profil/:id" element={<ProfilPublic />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

