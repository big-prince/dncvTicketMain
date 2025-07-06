import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import TicketPage from "./pages/TicketPage";
import AdminPage from "./pages/AdminPage";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tickets" element={<TicketPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                color: "#1f2937",
                fontSize: "14px",
                fontWeight: "500",
                padding: "16px 20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
