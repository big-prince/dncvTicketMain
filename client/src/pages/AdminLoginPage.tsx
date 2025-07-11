import React, { useState } from "react";
import { Shield, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { adminApi, adminAuth, type AdminProfile } from "../api/adminApi";
import toast from "react-hot-toast";

interface AdminLoginPageProps {
  onLogin: (adminData: AdminProfile) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showId, setShowId] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminId) {
      toast.error("Please enter your Admin ID");
      return;
    }

    // Validate admin ID format
    if (!/^DNCV-\d{4}$/.test(adminId)) {
      toast.error("Invalid Admin ID format. Must be DNCV-XXXX");
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminApi.login(adminId);

      if (response.success) {
        // Store token and set up authentication
        adminAuth.setToken(response.data.token);

        toast.success("Login successful!");
        onLogin(response.data.admin);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);

      const errorResponse = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (errorResponse.response?.status === 401) {
        toast.error("Invalid Admin ID or access denied");
      } else if (errorResponse.response?.status === 400) {
        toast.error("Invalid Admin ID format");
      } else if (errorResponse.response?.data?.message) {
        toast.error(errorResponse.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-purple-500" />
              <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                <Lock className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">
            De Noble Choral Voices - Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="adminId"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Admin ID
                </label>
                <div className="relative">
                  <input
                    id="adminId"
                    name="adminId"
                    type={showId ? "text" : "password"}
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="DNCV-XXXX"
                    maxLength={9}
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowId(!showId)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showId ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter your 9-character Admin ID (format: DNCV-XXXX)
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-500">
                Security Notice
              </h3>
              <p className="text-xs text-yellow-200 mt-1">
                This is a secure admin portal. All access is logged and
                monitored. If you don't have an Admin ID, please contact your
                system administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 De Noble Choral Voices</p>
          <p className="mt-1">Secure Admin Portal v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
