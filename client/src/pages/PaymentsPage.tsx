import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  User,
  Phone,
  Mail,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileText,
  Copy,
} from "lucide-react";
import { adminApi } from "../api/adminApi";
import toast from "react-hot-toast";

interface Payment {
  id: string;
  reference: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  ticketInfo: {
    type: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  };
  paymentInfo: {
    method: string;
    status: string;
    amount: number;
    transferMarkedAt: string;
  };
  createdAt: string;
  daysPending: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "amount">(
    "newest"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "urgent"
  >("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [processingPayments, setProcessingPayments] = useState<Set<string>>(
    new Set()
  );

  const loadPayments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getPendingPayments(currentPage, 20);

      if (response.success) {
        setPayments(response.data.payments);
        setPagination(response.data.pagination);
      } else {
        toast.error("Failed to load payments");
      }
    } catch (error) {
      console.error("Payments load error:", error);
      toast.error("Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments, sortBy, filterStatus]);

  const handleApprovePayment = async (payment: Payment) => {
    if (processingPayments.has(payment.reference)) return;

    try {
      setProcessingPayments((prev) => new Set(prev).add(payment.reference));

      const response = await adminApi.approvePayment(payment.reference);

      if (response.success) {
        toast.success(
          `Payment approved! Ticket sent to ${payment.customerInfo.email}`
        );
        loadPayments(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to approve payment");
      }
    } catch (error) {
      console.error("Approve payment error:", error);
      toast.error("Failed to approve payment");
    } finally {
      setProcessingPayments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(payment.reference);
        return newSet;
      });
    }
  };

  const handleRejectPayment = async (payment: Payment) => {
    const reason = prompt(
      `Reject payment from ${payment.customerInfo.name}?\n\nReason (optional):`
    );

    if (reason === null) return; // User cancelled

    if (processingPayments.has(payment.reference)) return;

    try {
      setProcessingPayments((prev) => new Set(prev).add(payment.reference));

      const response = await adminApi.rejectPayment(
        payment.reference,
        reason || "Payment verification failed"
      );

      if (response.success) {
        toast.success(`Payment rejected. Customer has been notified.`);
        loadPayments(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to reject payment");
      }
    } catch (error) {
      console.error("Reject payment error:", error);
      toast.error("Failed to reject payment");
    } finally {
      setProcessingPayments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(payment.reference);
        return newSet;
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (daysPending: number) => {
    if (daysPending >= 3) return "text-red-400 bg-red-500/10 border-red-500/20";
    if (daysPending >= 1)
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-green-400 bg-green-500/10 border-green-500/20";
  };

  const getPriorityLabel = (daysPending: number) => {
    if (daysPending >= 3) return "Urgent";
    if (daysPending >= 1) return "Due";
    return "New";
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerInfo.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.customerInfo.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "pending" && payment.daysPending < 3) ||
      (filterStatus === "urgent" && payment.daysPending >= 3);

    return matchesSearch && matchesFilter;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "amount":
        return b.ticketInfo.totalAmount - a.ticketInfo.totalAmount;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text mb-2"
              >
                <CreditCard className="inline w-8 h-8 mr-3 text-amber-400" />
                Payment Management
              </motion.h1>
              <p className="text-gray-300 text-lg">
                Review and process pending bank transfers
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={loadPayments}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <div className="text-sm text-gray-400">
                {pagination?.totalCount || 0} pending payments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "pending" | "urgent")
              }
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending (Recent)</option>
              <option value="urgent">Urgent (3+ days)</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "oldest" | "amount")
              }
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount">Highest Amount</option>
            </select>

            {/* Export */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Payments List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sortedPayments.length === 0 ? (
          <div className="text-center py-20">
            <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No payments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Payment Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 lg:mb-0">
                    {/* Customer */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-white">
                          {payment.customerInfo.name}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(
                            payment.daysPending
                          )}`}
                        >
                          {getPriorityLabel(payment.daysPending)}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">
                            {payment.customerInfo.email}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                payment.customerInfo.email,
                                "Email"
                              )
                            }
                            className="hover:text-amber-400 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{payment.customerInfo.phone}</span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                payment.customerInfo.phone,
                                "Phone"
                              )
                            }
                            className="hover:text-amber-400 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-white">
                          {payment.ticketInfo.type}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div>Quantity: {payment.ticketInfo.quantity}</div>
                        <div>
                          Unit Price:{" "}
                          {formatCurrency(payment.ticketInfo.unitPrice)}
                        </div>
                        <div className="font-medium text-green-400">
                          Total:{" "}
                          {formatCurrency(payment.ticketInfo.totalAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-white">
                          #{payment.reference}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(payment.reference, "Reference")
                          }
                          className="hover:text-amber-400 transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(payment.paymentInfo.transferMarkedAt)}
                          </span>
                        </div>
                        <div className="text-yellow-400">
                          {payment.daysPending} day
                          {payment.daysPending !== 1 ? "s" : ""} pending
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowDetailModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <button
                      onClick={() => handleRejectPayment(payment)}
                      disabled={processingPayments.has(payment.reference)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {processingPayments.has(payment.reference) ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      Reject
                    </button>

                    <button
                      onClick={() => handleApprovePayment(payment)}
                      disabled={processingPayments.has(payment.reference)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 text-green-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {processingPayments.has(payment.reference) ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Approve
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-gray-400">
              Showing {(pagination.currentPage - 1) * 20 + 1} to{" "}
              {Math.min(pagination.currentPage * 20, pagination.totalCount)} of{" "}
              {pagination.totalCount} payments
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          page === pagination.currentPage
                            ? "bg-amber-500 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!pagination.hasNext}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Payment Details
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Name:</span>{" "}
                        {selectedPayment.customerInfo.name}
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>{" "}
                        {selectedPayment.customerInfo.email}
                      </div>
                      <div>
                        <span className="text-gray-400">Phone:</span>{" "}
                        {selectedPayment.customerInfo.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Ticket Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Type:</span>{" "}
                        {selectedPayment.ticketInfo.type}
                      </div>
                      <div>
                        <span className="text-gray-400">Quantity:</span>{" "}
                        {selectedPayment.ticketInfo.quantity}
                      </div>
                      <div>
                        <span className="text-gray-400">Unit Price:</span>{" "}
                        {formatCurrency(selectedPayment.ticketInfo.unitPrice)}
                      </div>
                      <div>
                        <span className="text-gray-400">Total:</span>{" "}
                        <span className="text-green-400 font-medium">
                          {formatCurrency(
                            selectedPayment.ticketInfo.totalAmount
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Payment Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Reference:</span>{" "}
                        {selectedPayment.reference}
                      </div>
                      <div>
                        <span className="text-gray-400">Method:</span>{" "}
                        {selectedPayment.paymentInfo.method}
                      </div>
                      <div>
                        <span className="text-gray-400">Amount:</span>{" "}
                        {formatCurrency(selectedPayment.paymentInfo.amount)}
                      </div>
                      <div>
                        <span className="text-gray-400">Transfer Marked:</span>{" "}
                        {formatDate(
                          selectedPayment.paymentInfo.transferMarkedAt
                        )}
                      </div>
                      <div>
                        <span className="text-gray-400">Days Pending:</span>
                        <span
                          className={`ml-1 ${
                            selectedPayment.daysPending >= 3
                              ? "text-red-400"
                              : selectedPayment.daysPending >= 1
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {selectedPayment.daysPending} day
                          {selectedPayment.daysPending !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        handleRejectPayment(selectedPayment);
                        setShowDetailModal(false);
                      }}
                      disabled={processingPayments.has(
                        selectedPayment.reference
                      )}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>

                    <button
                      onClick={() => {
                        handleApprovePayment(selectedPayment);
                        setShowDetailModal(false);
                      }}
                      disabled={processingPayments.has(
                        selectedPayment.reference
                      )}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 text-green-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentsPage;
