import api from "./api";

// Types for API requests and responses
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface TicketPurchaseData {
  ticketType: string;
  quantity: number;
  email: string;
  phone: string;
  fullName: string;
}

export interface BankTransferResponse {
  success: boolean;
  message: string;
  data: {
    reference: string;
    customerName: string;
    amount: number;
    bankDetails: {
      bankName: string;
      accountName: string;
      accountNumber: string;
      sortCode: string;
      amount: number;
      reference: string;
      transferNote: string;
    };
  };
}

export interface PaymentCompletedData {
  reference: string;
  customerInfo: CustomerInfo;
  ticketInfo: {
    type: string;
    quantity: number;
    amount: number;
  };
}

export interface PaymentStatus {
  success: boolean;
  data: {
    reference: string;
    status: string;
    amount: number;
    customerName: string;
    ticketType: string;
    quantity: number;
    createdAt: string;
    paidAt?: string;
  };
}

// API Functions

/**
 * Process ticket purchase with bank transfer (generates reference automatically)
 */
export const processBankTransferPurchase = async (
  ticketType: string,
  quantity: number,
  email: string,
  phone: string,
  fullName: string
): Promise<BankTransferResponse> => {
  const response = await api.post("/api/payments/bank-transfer", {
    ticketType,
    quantity,
    email,
    phone,
    fullName,
  });
  return response.data;
};

// Keep for backward compatibility
export const initiateBankTransfer = processBankTransferPurchase;

// Mark transfer as completed by user
export const markTransferCompleted = async (reference: string) => {
  const response = await api.post("/api/payments/transfer-completed", {
    reference,
  });
  return response.data;
};

// Get payment status
export const getPaymentStatus = async (
  reference: string
): Promise<PaymentStatus> => {
  const response = await api.get(`/api/payments/status/${reference}`);
  return response.data;
};

// Verify payment (for future use)
export const verifyPayment = async (reference: string) => {
  const response = await api.get(`/api/payments/verify/${reference}`);
  return response.data;
};

// Verify ticket by ID or QR code
export interface TicketVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    customerName: string;
    ticketType: string;
    verifiedAt: string;
    isUsed?: boolean;
    usedAt?: string;
    verifiedBy?: string;
  };
}

export const verifyTicket = async (
  ticketId: string,
  verifiedBy: string = "Admin"
): Promise<TicketVerificationResponse> => {
  const response = await api.post(`/api/tickets/verify`, {
    ticketId,
    verifiedBy,
  });
  return response.data;
};

// Utility functions
export const getBankDetails = () => ({
  bankName: import.meta.env.VITE_BANK_NAME || "Access Bank Plc",
  accountName: import.meta.env.VITE_ACCOUNT_NAME || "De Noble Choral Voices",
  accountNumber: import.meta.env.VITE_ACCOUNT_NUMBER || "0123456789",
  sortCode: import.meta.env.VITE_SORT_CODE || "044150149",
});

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Legacy export for backward compatibility
export const ticketApi = {
  // Initialize bank transfer and get account details
  initiateBankTransfer: async (
    data: TicketPurchaseData
  ): Promise<BankTransferResponse> => {
    const response = await api.post(
      "/api/payments/bank-transfer/initialize",
      data
    );
    return response.data;
  },

  // Mark transfer as completed by user
  markTransferCompleted: async (data: PaymentCompletedData) => {
    const response = await api.post("/api/payments/bank-transfer/completed", {
      reference: data.reference,
      customerInfo: data.customerInfo,
      ticketInfo: data.ticketInfo,
    });
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (reference: string): Promise<PaymentStatus> => {
    const response = await api.get(`/api/payments/status/${reference}`);
    return response.data;
  },

  // Verify payment (for future use)
  verifyPayment: async (reference: string) => {
    const response = await api.get(`/api/payments/verify/${reference}`);
    return response.data;
  },

  // Admin functions (for future admin panel)
  admin: {
    // Get pending transfers
    getPendingTransfers: async (adminKey: string) => {
      const response = await api.get(
        `/api/payments/bank-transfer/pending?adminKey=${adminKey}`
      );
      return response.data;
    },

    // Approve transfer
    approveTransfer: async (reference: string, adminKey: string) => {
      const response = await api.post("/api/payments/bank-transfer/approve", {
        reference,
        adminKey,
      });
      return response.data;
    },

    // Reject transfer
    rejectTransfer: async (
      reference: string,
      adminKey: string,
      reason?: string
    ) => {
      const response = await api.post("/api/payments/bank-transfer/reject", {
        reference,
        adminKey,
        reason,
      });
      return response.data;
    },
  },
};

export default ticketApi;
