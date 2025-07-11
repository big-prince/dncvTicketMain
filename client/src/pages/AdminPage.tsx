import React, { useState, useEffect } from "react";
import { adminAuth, type AdminProfile } from "../api/adminApi";
import AdminLoginPage from "./AdminLoginPage";
import AdminDashboard from "./AdminDashboard";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize admin auth and check if user is already logged in
    adminAuth.init();

    const checkAuth = async () => {
      try {
        if (adminAuth.isAuthenticated()) {
          // If token exists and is valid, get admin profile
          const { adminApi } = await import("../api/adminApi");
          const response = await adminApi.getProfile();

          if (response.success) {
            setAdminData(response.data);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, remove it
            adminAuth.removeToken();
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        adminAuth.removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (admin: AdminProfile) => {
    setAdminData(admin);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setAdminData(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !adminData) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  return <AdminDashboard adminData={adminData} onLogout={handleLogout} />;
};

export default AdminPage;
