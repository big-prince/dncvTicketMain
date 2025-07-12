import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Clock,
  Target,
  Zap,
  Brain,
  AlertTriangle,
  CheckCircle,
  Info,
  MapPin,
  PieChart,
  Activity,
  Lightbulb,
  Star,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { adminApi, type EnhancedAnalyticsData } from "../api/adminApi";
import toast from "react-hot-toast";

const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] =
    useState<EnhancedAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getAnalytics();

      if (response.success) {
        setAnalyticsData(response.data);
      } else {
        toast.error("Failed to load analytics data");
      }
    } catch (error) {
      console.error("Analytics load error:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "optimization":
        return <Target className="w-5 h-5 text-purple-400" />;
      case "timing":
        return <Clock className="w-5 h-5 text-blue-400" />;
      case "projection":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "marketing":
        return <Zap className="w-5 h-5 text-orange-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
    }
  };

  const colors = [
    "#F59E0B",
    "#EF4444",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#84CC16",
    "#EC4899",
    "#6366F1",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading analytics...</p>
        </motion.div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Failed to load analytics data</p>
          <button
            onClick={loadAnalyticsData}
            className="mt-4 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalRevenue = analyticsData.revenueOverTime.reduce(
    (sum, day) => sum + day.revenue,
    0
  );
  const totalSales = analyticsData.salesOverTime.reduce(
    (sum, day) => sum + day.count,
    0
  );
  const avgOrderValue = analyticsData.averageOrderValue.avgOrderValue || 0;
  const topCustomerSpending = analyticsData.topCustomers[0]?.totalSpent || 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text mb-2"
              >
                <Brain className="inline w-6 h-6 md:w-8 md:h-8 mr-3 text-amber-400" />
                Smart Analytics
              </motion.h1>
              <p className="text-gray-300 text-base md:text-lg">
                Smart insights and data-driven recommendations
              </p>
            </div>
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:gap-4 md:space-y-0">
              <button
                onClick={loadAnalyticsData}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm md:text-base"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">
                Last updated:{" "}
                {new Date(analyticsData.metadata.lastUpdated).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-3 text-amber-400" />
            Smart Insights & Recommendations
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Insights */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Key Insights
              </h3>
              <div className="space-y-3">
                {analyticsData.aiInsights.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg"
                  >
                    {getInsightIcon(insight.type)}
                    <div>
                      <p className="font-medium text-sm">{insight.title}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {insight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                Smart Suggestions
              </h3>
              <div className="space-y-3">
                {analyticsData.aiInsights.suggestions.map(
                  (suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg"
                    >
                      {getSuggestionIcon(suggestion.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {suggestion.title}
                          </p>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              suggestion.impact === "high"
                                ? "bg-green-500/20 text-green-400"
                                : suggestion.impact === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {suggestion.impact} impact
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {suggestion.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Action Required
              </h3>
              <div className="space-y-3">
                {analyticsData.aiInsights.alerts.length > 0 ? (
                  analyticsData.aiInsights.alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{alert.title}</p>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              alert.urgency === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {alert.urgency}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {alert.description}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-gray-400">
                      All systems operating normally
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatCurrency(totalRevenue)}
            </h3>
            <p className="text-green-400 text-sm">Total Revenue</p>
            <p className="text-gray-400 text-xs mt-1">30-day period</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-400" />
              <ArrowUpRight className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatNumber(totalSales)}
            </h3>
            <p className="text-blue-400 text-sm">Total Sales</p>
            <p className="text-gray-400 text-xs mt-1">Orders completed</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-400" />
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatCurrency(avgOrderValue)}
            </h3>
            <p className="text-purple-400 text-sm">Avg Order Value</p>
            <p className="text-gray-400 text-xs mt-1">Per customer</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-orange-400" />
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatCurrency(topCustomerSpending)}
            </h3>
            <p className="text-orange-400 text-sm">Top Customer</p>
            <p className="text-gray-400 text-xs mt-1">Highest spender</p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-amber-400" />
              Revenue Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.revenueOverTime}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="_id.date"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF" }}
                  tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Ticket Type Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-amber-400" />
              Ticket Type Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  dataKey="revenue"
                  data={analyticsData.ticketTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {analyticsData.ticketTypeDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hourly Purchase Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-amber-400" />
              Peak Purchase Hours
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.hourlyPurchasePattern}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="_id"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF" }}
                  tickFormatter={(value) => `${value}:00`}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [
                    value,
                    name === "count" ? "Purchases" : "Revenue",
                  ]}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-amber-400" />
              VIP Customers
            </h3>
            <div className="space-y-4">
              {analyticsData.topCustomers.slice(0, 5).map((customer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-400"
                          : index === 2
                          ? "bg-orange-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {customer.customerName}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {customer.orderCount} orders • {customer.ticketCount}{" "}
                        tickets
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      {formatCurrency(customer.totalSpent)}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {formatCurrency(customer.avgOrderValue)} avg
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-amber-400" />
            Geographic Distribution (by Phone Area Code)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {analyticsData.geographicDistribution.map((location, index) => (
              <div
                key={index}
                className="bg-gray-700/30 rounded-lg p-4 text-center"
              >
                <p className="text-2xl font-bold text-white">
                  {location.count}
                </p>
                <p className="text-gray-400 text-sm">Area {location._id}</p>
                <p className="text-green-400 text-xs">
                  {formatCurrency(location.revenue)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
