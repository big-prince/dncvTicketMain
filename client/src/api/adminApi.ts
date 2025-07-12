/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

// Admin API endpoints
export const adminApi = {
  // Authentication
  login: async (adminId: string) => {
    const response = await api.post("/api/admin/login", { adminId });
    return response.data;
  },

  // Dashboard
  getDashboard: async () => {
    const response = await api.get("/api/admin/dashboard");
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/api/admin/profile");
    return response.data;
  },

  // Payment Management
  getPendingPayments: async (page = 1, limit = 20) => {
    const response = await api.get(
      `/api/admin/payments/pending?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  approvePayment: async (reference: string) => {
    const response = await api.post(`/api/admin/payments/${reference}/approve`);
    return response.data;
  },

  rejectPayment: async (reference: string, reason: string) => {
    const response = await api.post(`/api/admin/payments/${reference}/reject`, {
      reason,
    });
    return response.data;
  },

  // Analytics
  getAnalytics: async () => {
    const response = await api.get("/api/admin/analytics");
    return response.data;
  },

  // Admin Management (Super Admin only)
  getAllAdmins: async () => {
    const response = await api.get("/api/admin/admins");
    return response.data;
  },

  createAdmin: async (adminData: {
    name: string;
    role: string;
    permissions: Record<string, boolean>;
  }) => {
    const response = await api.post("/api/admin/admins", adminData);
    return response.data;
  },

  updateAdmin: async (adminId: string, updates: Record<string, any>) => {
    const response = await api.patch(`/api/admin/admins/${adminId}`, updates);
    return response.data;
  },

  deleteAdmin: async (adminId: string) => {
    const response = await api.delete(`/api/admin/admins/${adminId}`);
    return response.data;
  },

  // System Management
  getSystemStats: async () => {
    const response = await api.get("/api/admin/system/stats");
    return response.data;
  },

  toggleMaintenanceMode: async () => {
    const response = await api.post("/api/admin/system/maintenance");
    return response.data;
  },
};

// Admin authentication utilities
export const adminAuth = {
  // Set JWT token in localStorage and axios header
  setToken: (token: string) => {
    localStorage.setItem("adminToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  // Get JWT token from localStorage
  getToken: () => {
    return localStorage.getItem("adminToken");
  },

  // Remove JWT token
  removeToken: () => {
    localStorage.removeItem("adminToken");
    delete api.defaults.headers.common["Authorization"];
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    const token = adminAuth.getToken();
    if (!token) return false;

    try {
      // Basic JWT validation (check if token is expired)
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // Initialize auth (set token if exists)
  init: () => {
    const token = adminAuth.getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};

// Admin data types
export interface AdminProfile {
  adminId: string;
  name: string;
  role: string;
  permissions: Record<string, boolean>;
  lastLogin: string;
  loginCount: number;
  createdAt: string;
}

export interface DashboardStats {
  pendingPayments: number;
  approvedPayments: number;
  rejectedPayments: number;
  totalRevenue: number;
  todayStats: Array<{
    _id: string;
    count: number;
    revenue: number;
  }>;
}

export interface PendingPayment {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  ticketType: string;
  quantity: number;
  amount: number;
  status: string;
  phone: string;
  createdAt: string;
  transferMarkedAt?: string;
  daysPending: number;
}

export interface AnalyticsData {
  salesOverTime: Array<{
    _id: { date: string };
    count: number;
    revenue: number;
  }>;
  revenueOverTime: Array<{
    _id: { date: string };
    revenue: number;
  }>;
  ticketTypeDistribution: Array<{
    _id: string;
    count: number;
    revenue: number;
  }>;
  paymentStatusDistribution: Array<{
    _id: string;
    count: number;
    totalAmount: number;
  }>;
  topCustomers: Array<{
    _id: string;
    customerName: string;
    totalSpent: number;
    ticketCount: number;
    orderCount: number;
  }>;
}

// Enhanced Analytics Types
export interface AnalyticsInsight {
  type: "success" | "info" | "warning" | "error";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export interface AnalyticsSuggestion {
  type: "optimization" | "timing" | "projection" | "marketing";
  title: string;
  description: string;
  impact: "low" | "medium" | "high" | "info";
  effort: "none" | "low" | "medium" | "high";
}

export interface AnalyticsAlert {
  type: "warning" | "critical";
  title: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";
}

export interface AIInsights {
  insights: AnalyticsInsight[];
  suggestions: AnalyticsSuggestion[];
  alerts: AnalyticsAlert[];
}

export interface CustomerSegment {
  _id: string;
  customerName: string;
  totalSpent: number;
  ticketCount: number;
  orderCount: number;
  firstPurchase: string;
  lastPurchase: string;
  avgOrderValue: number;
  customerValue: "Regular" | "Premium" | "VIP";
  daysSinceFirstPurchase: number;
}

export interface TicketTypeAnalytics {
  _id: string;
  count: number;
  revenue: number;
  orders: number;
  avgPrice: number;
}

export interface TimeSeriesData {
  _id: { date: string };
  count: number;
  revenue: number;
  tickets?: number;
}

export interface HourlyPattern {
  _id: number;
  count: number;
  revenue: number;
}

export interface GeographicData {
  _id: string;
  count: number;
  revenue: number;
}

export interface ResponseTimeMetrics {
  avgResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
}

export interface AbandonmentData {
  totalStarted: number;
  completed: number;
  abandoned: number;
  completionRate: number;
  abandonmentRate: number;
}

export interface EnhancedAnalyticsData {
  salesOverTime: TimeSeriesData[];
  revenueOverTime: TimeSeriesData[];
  hourlyPurchasePattern: HourlyPattern[];
  ticketTypeDistribution: TicketTypeAnalytics[];
  averageOrderValue: {
    avgOrderValue: number;
    medianOrderValue: number;
    totalOrders: number;
    totalRevenue: number;
  };
  customerSegmentation: CustomerSegment[];
  topCustomers: CustomerSegment[];
  customerRetention: any[];
  geographicDistribution: GeographicData[];
  paymentStatusDistribution: any[];
  responseTimeMetrics: ResponseTimeMetrics[];
  abandonmentRate: AbandonmentData[];
  weeklyTrends: any[];
  monthlyComparison: any[];
  projectionData: {
    dailyAvgRevenue: number;
    dailyAvgTickets: number;
    totalDays: number;
  };
  aiInsights: AIInsights;
  metadata: {
    lastUpdated: string;
    dataRange: {
      from: string;
      to: string;
    };
    totalDataPoints: number;
    confidence: string;
  };
}
