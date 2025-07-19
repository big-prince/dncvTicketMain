import React, { useState, useRef, useEffect } from "react";
import { Scanner as QrScanner } from "@yudiel/react-qr-scanner";
import {
  Ticket,
  Search,
  Check,
  X,
  User,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  KeyRound,
  ChevronRight,
  AlertTriangle,
  PieChart,
  Users,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { verifyTicket } from "../api/ticketApi";
import { adminApi } from "../api/adminApi";
import { motion, AnimatePresence } from "framer-motion";
import "./TicketVerificationPage.css";

interface VerificationResult {
  success: boolean;
  message: string;
  data?: {
    customerName: string;
    ticketType: string;
    verifiedAt?: string;
    usedAt?: string;
    verifiedBy?: string;
    isUsed?: boolean;
  };
}

interface VerificationStats {
  summary?: {
    totalVerified: number;
    totalTickets: number;
    verificationPercentage: number;
  };
  recentVerifications?: {
    ticketId?: string;
    customerName?: string;
    ticketType?: string;
    verifiedAt?: string;
    verifiedBy?: string;
  }[];
  byTicketType?: {
    type?: string;
    typeName?: string;
    total: number;
    verified: number;
    percentage: number;
  }[];
}

const TicketVerificationPage: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<"scan" | "manual">("manual"); // Start with manual to avoid camera issues
  const [manualTicketId, setManualTicketId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  // Used internally for debugging
  const [, setScannedData] = useState<string | null>(null);
  const [stats, setStats] = useState<VerificationStats | null>({
    summary: {
      totalVerified: 0,
      totalTickets: 0,
      verificationPercentage: 0,
    },
    recentVerifications: [],
    byTicketType: [],
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const ticketIdInputRef = useRef<HTMLInputElement>(null);

  // Fetch verification stats on component mount
  useEffect(() => {
    fetchVerificationStats();
  }, []);

  // Fetch verification statistics
  const fetchVerificationStats = async () => {
    try {
      setIsLoadingStats(true);

      // Check if admin is authenticated
      if (!adminApi.isAuthenticated()) {
        console.error("User not authenticated");
        toast.error("Authentication required. Please login again.");
        setStats({
          summary: {
            totalVerified: 0,
            totalTickets: 0,
            verificationPercentage: 0,
          },
          recentVerifications: [],
          byTicketType: [],
        });
        return;
      }

      const response = await adminApi.getVerificationStats();
      if (response && response.success && response.data) {
        setStats(response.data);
      } else {
        console.error(
          "Failed to fetch verification stats:",
          response?.message || "Unknown error"
        );
        toast.error(
          `Failed to load statistics: ${response?.message || "Unknown error"}`
        );
        // Set default stats to avoid UI errors
        setStats({
          summary: {
            totalVerified: 0,
            totalTickets: 0,
            verificationPercentage: 0,
          },
          recentVerifications: [],
          byTicketType: [],
        });
      }
    } catch (error) {
      console.error("Error fetching verification stats:", error);
      toast.error("Error loading statistics. Please try refreshing the page.");
      // Set default stats to avoid UI errors
      setStats({
        summary: {
          totalVerified: 0,
          totalTickets: 0,
          verificationPercentage: 0,
        },
        recentVerifications: [],
        byTicketType: [],
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Handle QR code scan
  const handleQrScan = (result: string) => {
    try {
      setIsCameraActive(false);
      setScannedData(result);

      // Log the scanned data for debugging
      console.log("Scanned QR data:", result);

      // Try to parse the QR code data as JSON
      try {
        const parsedData = JSON.parse(result);
        if (parsedData && parsedData.ticketId) {
          // Verify the ticket
          verifyTicketById(parsedData.ticketId);
          return;
        }
      } catch {
        console.log("Not a JSON format QR code, trying alternative formats");
      }

      // If not JSON or doesn't have ticketId, check if it's a UUID format
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      // Check for custom DNCV ticket format (e.g. SUNDAY8257)
      const dncvTicketFormat = /^[A-Z]+\d+$/i;

      if (result && result.trim()) {
        if (uuidRegex.test(result.trim())) {
          // Standard UUID format
          verifyTicketById(result.trim());
          return;
        } else if (dncvTicketFormat.test(result.trim())) {
          // Custom DNCV format (e.g., SUNDAY8257)
          verifyTicketById(result.trim().toUpperCase());
          return;
        } else {
          // Try the raw data as a last resort
          verifyTicketById(result.trim());
        }
      } else {
        toast.error("Invalid or empty QR code");
      }
    } catch (error) {
      console.error("QR scan error:", error);
      toast.error("Failed to process QR code");
    }
  };

  // Handle manual ticket ID verification
  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualTicketId.trim()) {
      verifyTicketById(manualTicketId.trim());
    } else {
      toast.error("Please enter a ticket ID");
      ticketIdInputRef.current?.focus();
    }
  };

  // Verify ticket by ID
  const verifyTicketById = async (ticketId: string) => {
    if (!ticketId || !ticketId.trim()) {
      toast.error("Invalid ticket ID");
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationResult(null);

      console.log("Verifying ticket ID:", ticketId);
      const response = await verifyTicket(ticketId);
      console.log("Verification response:", response);

      if (response && response.success) {
        setVerificationResult({
          success: true,
          message: "Ticket verified successfully!",
          data: {
            customerName: response.data?.customerName || "Guest",
            ticketType: response.data?.ticketType || "Unknown Ticket",
            verifiedAt: response.data?.verifiedAt,
            usedAt: response.data?.usedAt,
            verifiedBy: response.data?.verifiedBy,
            isUsed: response.data?.isUsed,
          },
        });

        // Play success sound
        try {
          const successSound = new Audio("/sounds/success.mp3");
          await successSound.play();
        } catch (e) {
          console.log("Audio play error:", e);
        }

        toast.success("Ticket verified successfully!");

        // Refresh the stats after successful verification
        fetchVerificationStats();
      } else {
        setVerificationResult({
          success: false,
          message: response?.message || "Verification failed: Unknown error",
          data:
            response?.data && response.data.isUsed !== undefined
              ? {
                  customerName: response.data.customerName || "Unknown",
                  ticketType: response.data.ticketType || "Unknown Ticket",
                  isUsed: response.data.isUsed,
                  usedAt: response.data.usedAt,
                  verifiedBy: response.data.verifiedBy,
                }
              : undefined,
        });

        // Play error sound
        try {
          const errorSound = new Audio("/sounds/error.mp3");
          await errorSound.play();
        } catch (e) {
          console.log("Audio play error:", e);
        }

        toast.error(response?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Ticket verification error:", error);
      setVerificationResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to verify ticket. Please try again.",
      });
      toast.error("Failed to verify ticket: Network or server error");
    } finally {
      setIsVerifying(false);
      setManualTicketId("");
    }
  };

  // Reset verification
  const resetVerification = () => {
    setVerificationResult(null);
    setScannedData(null);
    setManualTicketId("");
    if (activeMethod === "scan") {
      setIsCameraActive(true);
    } else {
      ticketIdInputRef.current?.focus();
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-800">
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center">
            <Ticket className="mr-2 h-5 w-5 text-yellow-500" />
            Ticket Verification
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Verify concert tickets using QR code or ticket ID
          </p>
        </div>

        <div className="p-4 md:p-6">
          {/* Verification method tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => {
                setActiveMethod("scan");
                setIsCameraActive(true);
                setVerificationResult(null);
              }}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                activeMethod === "scan"
                  ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                  : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-300"
              }`}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR Code
            </button>
            <button
              onClick={() => {
                setActiveMethod("manual");
                setIsCameraActive(false);
                setVerificationResult(null);
                setTimeout(() => ticketIdInputRef.current?.focus(), 100);
              }}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                activeMethod === "manual"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                  : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-300"
              }`}
            >
              <KeyRound className="h-4 w-4 mr-2" />
              Enter Ticket ID
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Verification UI - Left side */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
                <AnimatePresence mode="wait">
                  {verificationResult ? (
                    // Verification result display
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Result header with icon */}
                      <div className="flex flex-col items-center justify-center text-center mb-6">
                        <div
                          className={`flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
                            verificationResult.success
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {verificationResult.success ? (
                            <Check className="h-8 w-8" />
                          ) : (
                            <X className="h-8 w-8" />
                          )}
                        </div>
                        <h3
                          className={`text-xl font-bold ${
                            verificationResult.success
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {verificationResult.success
                            ? "Ticket Valid"
                            : "Verification Failed"}
                        </h3>
                        <p className="text-gray-400 mt-1">
                          {verificationResult.message}
                        </p>
                      </div>

                      {/* Ticket details */}
                      {verificationResult.success &&
                        verificationResult.data && (
                          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <User className="h-5 w-5 text-blue-400 mt-0.5" />
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Customer Name
                                  </p>
                                  <p className="font-medium text-white">
                                    {verificationResult.data.customerName ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Ticket className="h-5 w-5 text-yellow-400 mt-0.5" />
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Ticket Type
                                  </p>
                                  <p className="font-medium text-white">
                                    {verificationResult.data.ticketType ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Clock className="h-5 w-5 text-green-400 mt-0.5" />
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Verification Time
                                  </p>
                                  <p className="font-medium text-white">
                                    {new Date().toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Error details for already used tickets */}
                      {!verificationResult.success &&
                        verificationResult.data &&
                        verificationResult.data.isUsed && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                              <div className="space-y-2">
                                <div>
                                  <p className="text-gray-400 text-sm">
                                    Previously Used
                                  </p>
                                  <p className="font-medium text-white">
                                    {verificationResult.data.usedAt
                                      ? new Date(
                                          verificationResult.data.usedAt
                                        ).toLocaleString()
                                      : "Unknown time"}
                                  </p>
                                </div>
                                {verificationResult.data.verifiedBy && (
                                  <div>
                                    <p className="text-gray-400 text-sm">
                                      Verified By
                                    </p>
                                    <p className="font-medium text-white">
                                      {verificationResult.data.verifiedBy}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Action buttons */}
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={resetVerification}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
                        >
                          Verify Another Ticket
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : activeMethod === "scan" ? (
                    // QR Scanner
                    <motion.div
                      key="scanner"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg">
                        {isCameraActive ? (
                          <div className="bg-black relative rounded-lg overflow-hidden">
                            <div className="absolute inset-0 z-10 pointer-events-none border-2 border-yellow-500 rounded-lg"></div>
                            <QrScanner
                              onScan={(detectedCodes) => {
                                if (detectedCodes.length > 0) {
                                  const result = detectedCodes[0].rawValue;
                                  handleQrScan(result);
                                }
                              }}
                              onError={(error) => {
                                console.log(
                                  "QR scanner error:",
                                  error instanceof Error
                                    ? error.message
                                    : "Unknown error"
                                );
                                if (
                                  error instanceof Error &&
                                  error.message.includes("Permission")
                                ) {
                                  toast.error(
                                    "Camera permission denied. Please allow camera access."
                                  );
                                  setIsCameraActive(false);
                                }
                              }}
                              styles={{
                                container: {
                                  borderRadius: "0.5rem",
                                  padding: 0,
                                  background: "black",
                                },
                                video: {
                                  width: "100%",
                                  height: "100%",
                                },
                              }}
                            />
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent h-12 z-20"></div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-12 z-20"></div>
                          </div>
                        ) : (
                          <div className="w-full h-72 bg-gray-900 rounded-lg flex items-center justify-center">
                            <button
                              onClick={() => setIsCameraActive(true)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
                            >
                              <QrCode className="mr-2 h-5 w-5" />
                              Activate Camera
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-4 text-center">
                        Position the QR code within the frame to scan
                      </p>
                    </motion.div>
                  ) : (
                    // Manual Entry
                    <motion.div
                      key="manual"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <form
                        onSubmit={handleManualVerify}
                        className="w-full max-w-md mx-auto"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="ticketId"
                            className="block text-sm font-medium text-gray-400 mb-2"
                          >
                            Enter Ticket ID
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              id="ticketId"
                              ref={ticketIdInputRef}
                              value={manualTicketId}
                              onChange={(e) =>
                                setManualTicketId(e.target.value)
                              }
                              placeholder="e.g. 1a2b3c4d-5e6f-7g8h-9i0j"
                              className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              autoComplete="off"
                            />
                            <button
                              type="submit"
                              disabled={isVerifying || !manualTicketId.trim()}
                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:text-blue-100/50 text-white px-4 py-3 rounded-r-lg transition-colors flex items-center"
                            >
                              {isVerifying ? (
                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                              ) : (
                                <>
                                  <Search className="h-5 w-5" />
                                  <span className="ml-2 hidden sm:inline">
                                    Verify
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="flex flex-col items-center mt-4">
                        <div className="text-center max-w-xs">
                          <p className="text-gray-400 text-sm">
                            Enter the unique ticket ID to verify attendee access
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Statistics Panel - Right side */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 h-full">
                <h3 className="text-white font-medium flex items-center mb-4">
                  <PieChart className="h-5 w-5 mr-2 text-indigo-400" />
                  Verification Stats
                </h3>

                {isLoadingStats ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin h-8 w-8 border-3 border-indigo-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : stats ? (
                  <>
                    {/* Summary Stats */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-gray-400 text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1 text-green-400" />
                          Verified Tickets
                        </div>
                        <div className="text-green-400 font-medium">
                          {stats.summary?.verificationPercentage || 0}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{
                            width: `${
                              stats.summary?.verificationPercentage || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-gray-400 text-sm mt-2 text-center">
                        <span className="text-white font-medium">
                          {stats.summary?.totalVerified || 0}
                        </span>{" "}
                        of{" "}
                        <span className="text-white font-medium">
                          {stats.summary?.totalTickets || 0}
                        </span>{" "}
                        tickets
                      </div>
                    </div>

                    {/* Recent Verifications */}
                    <div className="mb-4">
                      <h4 className="text-sm uppercase text-gray-400 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-400" />
                        Recent Entries
                      </h4>
                      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                        {stats.recentVerifications &&
                        stats.recentVerifications.length > 0 ? (
                          <div className="max-h-40 overflow-y-auto">
                            {stats.recentVerifications
                              .slice(0, 5)
                              .map((entry, index) => (
                                <div
                                  key={index}
                                  className={`px-3 py-2 ${
                                    index !==
                                    Math.min(
                                      4,
                                      (stats.recentVerifications?.length || 1) -
                                        1
                                    )
                                      ? "border-b border-gray-700"
                                      : ""
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="truncate">
                                      <span className="text-white text-sm font-medium">
                                        {entry.customerName}
                                      </span>
                                      <p className="text-gray-400 text-xs">
                                        {entry.ticketType}
                                      </p>
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      {entry.verifiedAt
                                        ? new Date(
                                            entry.verifiedAt
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })
                                        : "Unknown time"}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="py-6 text-center text-gray-400 text-sm">
                            No verifications yet
                          </div>
                        )}
                      </div>
                    </div>

                    {/* By Ticket Type */}
                    <div>
                      <h4 className="text-sm uppercase text-gray-400 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1 text-purple-400" />
                        By Ticket Type
                      </h4>
                      <div className="space-y-2">
                        {stats.byTicketType && stats.byTicketType.length > 0 ? (
                          stats.byTicketType.map((typeStat, index) => (
                            <div
                              key={index}
                              className="bg-gray-900 px-3 py-2 rounded border border-gray-700"
                            >
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-white">
                                  {typeStat.typeName}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {typeStat.verified}/{typeStat.total}
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div
                                  className="bg-indigo-500 h-1.5 rounded-full"
                                  style={{
                                    width: `${typeStat.percentage || 0}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="bg-gray-900 px-3 py-4 rounded border border-gray-700 text-center text-gray-400 text-sm">
                            No ticket type data available
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    Failed to load statistics
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Concert details */}
          <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="font-medium text-white">
                    Sunday, 28th September 2025
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="font-medium text-white">5:00 PM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Venue</p>
                  <p className="font-medium text-white">
                    Oasis Event Centre, Port Harcourt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketVerificationPage;
