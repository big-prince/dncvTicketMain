import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Star,
  ArrowLeft,
  Shield,
  Ticket,
  Crown,
  Heart,
  Trophy,
  Award,
  CheckCircle,
  Zap,
  Phone,
  Mail,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import TicketModal from "../components/TicketModal";

interface TicketType {
  id: string;
  name: string;
  price: string;
  priceNumber: number; // For calculations
  description: string;
  image: string;
  available: number;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  gradient: string;
  bgGradient: string;
  iconBg: string;
}

// Modal ticket interface (what TicketModal expects)
interface ModalTicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  available: number;
}

const TicketPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<ModalTicketType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const ticketRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const tickets: TicketType[] = [
    {
      id: "student",
      name: "Student",
      price: "₦2,000",
      priceNumber: 2000,
      description: "Special discounted price for students with valid ID",
      image: "/images/STUDENTS.jpg",
      available: 50,
      features: [
        "General Entrance",
        "Valid Student ID Required",
        "Special Student Seating Area",
      ],
      icon: Shield,
      popular: false,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-500/10 to-indigo-600/10",
      iconBg: "from-blue-400 to-indigo-500",
    },
    {
      id: "regular",
      name: "Regular",
      price: "₦5,000",
      priceNumber: 5000,
      description: "Standard seating with great view of the stage",
      image: "/images/Regular TIcket.jpg",
      available: 150,
      features: ["Concert Program", "Photo Opportunity", "Reserved Seating"],
      icon: Ticket,
      popular: false,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-600/10",
      iconBg: "from-green-400 to-emerald-500",
    },
    {
      id: "vip-single",
      name: "VIP Single",
      price: "₦25,000",
      priceNumber: 25000,
      description: "Premium seating with exclusive perks",
      image: "/images/VIP single.jpg",
      available: 40,
      features: ["Front Row Seating", "Light Refreshments"],
      icon: Crown,
      popular: true,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-600/10",
      iconBg: "from-purple-400 to-pink-500",
    },
    {
      id: "vip-couple",
      name: "VIP Couple",
      price: "₦50,000",
      priceNumber: 50000,
      description: "Perfect for couples seeking a premium experience",
      image: "/images/VIP couple.jpg",
      available: 20,
      features: [
        "Premium Couple Seating",
        "Medium Refreshments",
        "Private Photo Session",
      ],
      icon: Heart,
      popular: false,
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-500/10 to-pink-600/10",
      iconBg: "from-rose-400 to-pink-500",
    },
    {
      id: "table",
      name: "Table for 6",
      price: "₦200,000",
      priceNumber: 200000,
      description: "Reserved table for groups with premium service",
      image: "/images/Table.jpg",
      available: 10,
      features: [
        "Private VIP Table for 6",
        "Dedicated Service",
        "Premium Refreshments",
      ],
      icon: Trophy,
      popular: true,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-500/10 to-orange-600/10",
      iconBg: "from-amber-400 to-orange-500",
    },
  ];

  useEffect(() => {
    const selectedTicketId = searchParams.get("selected");
    if (selectedTicketId && ticketRefs.current[selectedTicketId]) {
      // Scroll to selected ticket with offset for header
      setTimeout(() => {
        const element = ticketRefs.current[selectedTicketId];
        if (element) {
          const yOffset = -100; // Offset for header
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });

          // Add highlight effect
          element.style.transform = "scale(1.05)";
          element.style.boxShadow = "0 0 50px rgba(245, 158, 11, 0.5)";
          setTimeout(() => {
            element.style.transform = "";
            element.style.boxShadow = "";
          }, 2000);
        }
      }, 100);
    }
  }, [searchParams]);

  const handleTicketSelect = (ticket: TicketType) => {
    // Convert ticket data to format expected by TicketModal
    const modalTicket: ModalTicketType = {
      id: ticket.id,
      name: ticket.name,
      price: ticket.priceNumber,
      description: ticket.description,
      image: ticket.image,
      available: ticket.available,
    };

    setSelectedTicket(modalTicket);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Link
        to="/"
        className="mt-6 px-4 inline-flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Tickets Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Available Tickets
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                ref={(el) => {
                  if (el) {
                    ticketRefs.current[ticket.id] = el;
                  }
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative transition-all duration-500"
              >
                {/* Popular Badge */}
                {ticket.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                      <Star className="inline w-4 h-4 mr-1" />
                      Best Seller
                    </div>
                  </div>
                )}

                <div
                  className={`premium-card p-8 bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-2 ${
                    ticket.popular
                      ? "border-amber-400/60 shadow-amber-500/20"
                      : "border-gray-700/50"
                  } rounded-3xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 backdrop-blur-sm relative overflow-hidden h-full flex flex-col`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${ticket.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Ticket Image */}
                  <div className="relative h-48 -m-8 mb-6 overflow-hidden rounded-t-3xl">
                    <img
                      src={ticket.image}
                      alt={ticket.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ticket.iconBg} flex items-center justify-center shadow-lg`}
                        >
                          <ticket.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-bold">
                            {ticket.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {ticket.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-4xl font-display font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                          {ticket.price}
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {ticket.available} available
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {ticket.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-start text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Buy Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTicketSelect(ticket)}
                      disabled={ticket.available === 0}
                      className={`w-full ${
                        ticket.available === 0
                          ? "bg-gray-600 cursor-not-allowed"
                          : ticket.popular
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl shadow-amber-500/30"
                          : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-amber-500 hover:to-orange-500"
                      } text-white font-display font-semibold py-4 px-6 rounded-2xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Ticket className="w-5 h-5" />
                        {ticket.available === 0 ? "Sold Out" : "Buy Ticket"}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Why Choose Our{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Experience?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-elegant font-light">
              We ensure a premium experience with secure processes, instant
              confirmation, and outstanding service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="premium-card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-blue-200 transition-colors duration-300">
                  Instant Confirmation
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Get instant email confirmation with all event details and
                  payment reference for bank transfer.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <div className="premium-card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-emerald-200 transition-colors duration-300">
                  Secure Process
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Safe and secure manual bank transfer with admin approval
                  process for verified transactions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group"
            >
              <div className="premium-card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                  Premium Experience
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Exceptional service and unforgettable cultural experience at
                  Port Harcourt's finest venue.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us for any questions about tickets or the event
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-700/50">
                <Phone className="h-5 w-5 text-amber-400" />
                <div className="text-left">
                  <p className="text-white font-medium">+234 814 934 9466</p>
                  <p className="text-gray-400 text-sm">Jack</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-700/50">
                <Mail className="h-5 w-5 text-amber-400" />
                <div className="text-left">
                  <p className="text-white font-medium">
                    denoblechoralvoices@gmail.com
                  </p>
                  <p className="text-gray-400 text-sm">Email us</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default TicketPage;
