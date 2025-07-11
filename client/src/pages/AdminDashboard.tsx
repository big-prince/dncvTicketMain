import React, { useState, useEffect } from "react";
import {
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  User,
  RefreshCw,
} from "lucide-react";
import {
  adminApi,
  adminAuth,
  type AdminProfile,
  type DashboardStats,
  type PendingPayment,
} from "../api/adminApi";
import toast from "react-hot-toast";

interface AdminDashboardProps {
  adminData: AdminProfile;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminData,
  onLogout,
}) => {
  const [dashboardData, setDashboardData] = useState<{
    statistics: DashboardStats;
    recentPendingPayments: PendingPayment[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getDashboard();
      console.log("🚀 ~ loadDashboardData ~ response:", response);

      if (response.success) {
        setDashboardData(response.data);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    adminAuth.removeToken();
    onLogout();
    toast.success("Logged out successfully");
  };

  const handleApprovePayment = async (reference: string) => {
    try {
      const response = await adminApi.approvePayment(reference);

      if (response.success) {
        toast.success("Payment approved successfully");
        loadDashboardData(); // Refresh data
      } else {
        toast.error(response.message || "Failed to approve payment");
      }
    } catch (error) {
      console.error("Approve payment error:", error);
      toast.error("Failed to approve payment");
    }
  };

  const handleRejectPayment = async (reference: string) => {
    const reason = prompt("Enter rejection reason (optional):");

    try {
      const response = await adminApi.rejectPayment(
        reference,
        reason || "Payment verification failed"
      );

      if (response.success) {
        toast.success("Payment rejected successfully");
        loadDashboardData(); // Refresh data
      } else {
        toast.error(response.message || "Failed to reject payment");
      }
    } catch (error) {
      console.error("Reject payment error:", error);
      toast.error("Failed to reject payment");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">DNCV Admin Portal</h1>
                  <p className="text-xs text-gray-400">5th Edition Concert</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{adminData.name}</span>
                <span className="text-purple-400 bg-purple-900/30 px-2 py-1 rounded text-xs">
                  {adminData.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "payments"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Payments
            </button>
            {adminData.permissions.viewAnalytics && (
              <button
                onClick={() => setActiveTab("analytics")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "analytics"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Analytics
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && dashboardData && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Payments</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.statistics.pendingPayments}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Approved Payments</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.statistics.approvedPayments}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Rejected Payments</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.statistics.rejectedPayments}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(dashboardData.statistics.totalRevenue)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Pending Payments */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Recent Pending Payments
                  </h2>
                  <button
                    onClick={loadDashboardData}
                    className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {dashboardData.recentPendingPayments.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No pending payments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentPendingPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="font-medium text-white">
                                  {payment.customerName}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {payment.email}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-400">
                                  {payment.ticketType}
                                </p>
                                <p className="text-sm text-white">
                                  {payment.quantity} ticket(s)
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-white">
                                  {formatCurrency(payment.amount)}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {payment.reference}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-6">
                            {adminData.permissions.approvePayments && (
                              <button
                                onClick={() =>
                                  handleApprovePayment(payment.reference)
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {adminData.permissions.rejectPayments && (
                              <button
                                onClick={() =>
                                  handleRejectPayment(payment.reference)
                                }
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Payment Management
            </h2>
            <p className="text-gray-400">
              Payment management interface coming soon...
            </p>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Analytics</h2>
            <p className="text-gray-400">Analytics dashboard coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
