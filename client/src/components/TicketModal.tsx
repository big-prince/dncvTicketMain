import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Calendar,
  MapPin,
  Clock,
  Building,
  CheckCircle,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  processBankTransferPurchase,
  markTransferCompleted,
  getBankDetails,
  formatCurrency,
} from "../api/ticketApi";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  available: number;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketType | null;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferCompleted, setTransferCompleted] = useState(false);
  const [completedTransferData, setCompletedTransferData] = useState<{
    reference: string;
    customerName: string;
  } | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Reset form when modal closes
  const resetForm = () => {
    setQuantity(1);
    setTransferCompleted(false);
    setCompletedTransferData(null);
    setCustomerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Validate ticket object
  if (
    !ticket ||
    !ticket.id ||
    !ticket.name ||
    typeof ticket.price !== "number"
  ) {
    console.error("Invalid ticket object passed to TicketModal:", ticket);
    return null;
  }

  const total = ticket.price * quantity;
  const bankDetails = getBankDetails();

  const handleTransferCompleted = async () => {
    setIsProcessing(true);
    try {
      // First, process the bank transfer purchase to get reference
      const purchaseResponse = await processBankTransferPurchase(
        ticket.id,
        quantity,
        customerInfo.email,
        customerInfo.phone,
        `${customerInfo.firstName} ${customerInfo.lastName}`
      );

      if (purchaseResponse.success) {
        // Then mark the transfer as completed
        const completedResponse = await markTransferCompleted(
          purchaseResponse.data.reference
        );

        if (completedResponse.success) {
          setTransferCompleted(true);
          setCompletedTransferData({
            reference: purchaseResponse.data.reference,
            customerName: purchaseResponse.data.customerName,
          });
          toast.success(
            "Transfer confirmed! You'll receive your tickets once payment is verified."
          );

          // Clear form and close modal after 4 seconds
          setTimeout(() => {
            handleClose();
          }, 6000);
        }
      }
    } catch (error) {
      console.error("Transfer completion error:", error);
      toast.error("Failed to process transfer. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= ticket.available) {
      setQuantity(newQuantity);
    }
  };

  const isFormValid =
    customerInfo.firstName &&
    customerInfo.lastName &&
    customerInfo.email &&
    customerInfo.phone;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={ticket.image}
                alt={ticket.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{ticket.name}</h2>
                <p className="text-white/90">{ticket.description}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div className="grid grid-cols-1 gap-4 p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold text-gray-100">
                      Sunday, 28th September 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-semibold text-gray-100">
                      5:00 PM - 8:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Venue</p>
                    <p className="font-semibold text-gray-100">
                      Oasis Event Centre, Port Harcourt
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    Quantity
                  </h3>
                  <p className="text-sm text-gray-400">
                    {ticket.available} tickets available
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    <Minus className="w-4 h-4 text-gray-300" />
                  </button>
                  <span className="text-xl font-semibold w-8 text-center text-gray-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= ticket.available}
                    className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    <Plus className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-100">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={customerInfo.firstName}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={customerInfo.lastName}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-100">
                  Payment Method
                </h3>
                <div className="p-4 border-2 border-primary-500 bg-primary-500/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-primary-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        Bank Transfer
                      </h4>
                      <p className="text-sm text-gray-400">
                        Safe and secure bank transfer payment
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-primary-500" />
                  </div>
                </div>

                {/* Bank Details Card - Always Visible */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary-400" />
                      Bank Details
                    </h4>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                      Transfer to this account
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-gray-400 font-medium">
                        Bank Name:
                      </span>
                      <span className="text-white font-semibold">
                        {bankDetails.bankName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-gray-400 font-medium">
                        Account Name:
                      </span>
                      <span className="text-white font-semibold">
                        {bankDetails.accountName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700">
                      <span className="text-gray-400 font-medium">
                        Account Number:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-lg tracking-wider">
                          {bankDetails.accountNumber}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(bankDetails.accountNumber)
                          }
                          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                          title="Copy account number"
                        >
                          <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400 font-medium">Amount:</span>
                      <span className="text-2xl font-bold text-primary-400">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  {completedTransferData && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="text-center mb-3">
                        <div className="inline-flex items-center space-x-2 text-green-400 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">
                            Transfer Confirmed!
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-200 font-medium">
                          Your Payment Reference:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 font-bold text-lg">
                            {completedTransferData.reference}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(completedTransferData.reference)
                            }
                            className="p-1 hover:bg-green-500/20 rounded"
                            title="Copy reference"
                          >
                            <Copy className="w-4 h-4 text-green-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-green-200 text-center mb-2">
                        Save this reference! You'll receive your tickets once we
                        verify your payment.
                      </p>
                      <p className="text-sm text-green-200 text-center font-semibold">
                        Please contact Jack (+234 814 934 9466) or Elvis (+234 806 868 3392) 
                        to follow up on your payment verification.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-blue-200 mb-2">
                        <strong>How it works:</strong>
                      </p>
                      <ol className="text-sm text-blue-200 space-y-1 list-decimal list-inside">
                        <li>Transfer the exact amount to the account above</li>
                        <li>
                          Use <span className="font-semibold">"ticket"</span> as
                          description
                        </li>
                        <li>
                          Click "Transfer Done" after completing the transfer
                        </li>
                        <li>You'll get your unique payment reference</li>
                        <li>
                          After clicking "Transfer Done", contact Jack (+234 814 934 9466) 
                          or Elvis (+234 806 868 3392) to follow up on your payment
                        </li>
                        <li>
                          You'll receive your e-ticket to your email once we
                          verify payment
                        </li>
                        <li>We verify payments within 2 hours</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total and Payment */}
              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <p className="text-3xl font-bold text-primary-400">
                      ₦{total.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {quantity} × ₦{ticket.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {!transferCompleted && isFormValid && (
                  <button
                    onClick={handleTransferCompleted}
                    disabled={isProcessing}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {isProcessing
                        ? "Processing Transfer..."
                        : "Transfer Done"}
                    </span>
                  </button>
                )}

                {transferCompleted && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2 text-green-400 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">Payment Confirmed!</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Check your email for payment details and contact Jack (+234 814 934 9466) 
                      or Elvis (+234 806 868 3392) to follow up
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      This dialog will close automatically...
                    </p>
                  </div>
                )}

                {!isFormValid && !transferCompleted && (
                  <button
                    disabled
                    className="w-full py-4 bg-gray-700 text-gray-400 font-semibold rounded-xl cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Building className="w-5 h-5" />
                    <span>Complete all fields to proceed</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;
