/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  QrCode,
} from "lucide-react";

interface TicketSale {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: "completed" | "pending" | "failed";
  purchaseDate: string;
  paymentReference: string;
}

interface Stats {
  totalSales: number;
  totalRevenue: number;
  totalTickets: number;
  conversionRate: number;
}

const AdminPage: React.FC = () => {
  const [sales, setSales] = useState<TicketSale[]>([]);
  const [filteredSales, setFilteredSales] = useState<TicketSale[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalRevenue: 0,
    totalTickets: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const mockSales: TicketSale[] = [
    {
      id: "1",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
      ticketType: "VIP Single",
      quantity: 1,
      totalAmount: 15000,
      paymentStatus: "completed",
      purchaseDate: "2024-12-20T10:30:00Z",
      paymentReference: "PSK_12345",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "+234 802 345 6789",
      ticketType: "Regular Ticket",
      quantity: 2,
      totalAmount: 10000,
      paymentStatus: "completed",
      purchaseDate: "2024-12-20T11:15:00Z",
      paymentReference: "PSK_12346",
    },
    {
      id: "3",
      customerName: "Mike Johnson",
      email: "mike@example.com",
      phone: "+234 803 456 7890",
      ticketType: "Table Booking",
      quantity: 1,
      totalAmount: 50000,
      paymentStatus: "pending",
      purchaseDate: "2024-12-20T12:00:00Z",
      paymentReference: "PSK_12347",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setSales(mockSales);
      setFilteredSales(mockSales);

      // Calculate stats
      const completed = mockSales.filter(
        (sale) => sale.paymentStatus === "completed"
      );
      const totalRevenue = completed.reduce(
        (sum, sale) => sum + sale.totalAmount,
        0
      );
      const totalTickets = completed.reduce(
        (sum, sale) => sum + sale.quantity,
        0
      );

      setStats({
        totalSales: completed.length,
        totalRevenue,
        totalTickets,
        conversionRate: 85.5,
      });
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = sales;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sale) =>
          sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.paymentReference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((sale) => sale.paymentStatus === filterStatus);
    }

    setFilteredSales(filtered);
  }, [sales, searchTerm, filterStatus]);

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Customer Name",
      "Email",
      "Phone",
      "Ticket Type",
      "Quantity",
      "Amount",
      "Status",
      "Date",
      "Reference",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredSales.map((sale) =>
        [
          sale.customerName,
          sale.email,
          sale.phone,
          sale.ticketType,
          sale.quantity,
          sale.totalAmount,
          sale.paymentStatus,
          new Date(sale.purchaseDate).toLocaleDateString(),
          sale.paymentReference,
        ].join(",")
      ),
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-sales-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <RefreshCw className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                De Noble Choral Voices 5th Edition Concert
              </p>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Sales
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalSales}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₦{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tickets Sold
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalTickets}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conversion Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.conversionRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-3 bg-secondary text-white rounded-2xl hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Sales ({filteredSales.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="hover:bg-gray-50 dark:hover:bg-dark-bg/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {sale.customerName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {sale.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {sale.ticketType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {sale.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ₦{sale.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          sale.paymentStatus
                        )}`}
                      >
                        {getStatusIcon(sale.paymentStatus)}
                        <span className="ml-1 capitalize">
                          {sale.paymentStatus}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sale.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary hover:text-primary/80">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-secondary hover:text-secondary/80">
                          <QrCode className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No sales found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
