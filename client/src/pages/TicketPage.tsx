import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TicketModal from "../components/TicketModal";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  available: number;
  features: string[];
}

const TicketPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tickets: TicketType[] = [
    {
      id: "regular",
      name: "Regular Ticket",
      price: 5000,
      description: "Standard seating with great view of the stage",
      image: "/images/Regular TIcket.jpg",
      available: 150,
      features: [
        "General admission seating",
        "Access to main auditorium",
        "Concert program included",
        "Parking available",
      ],
    },
    {
      id: "student",
      name: "Student Ticket",
      price: 2000,
      description: "Special discounted price for students with valid ID",
      image: "/images/STUDENTS.jpg",
      available: 50,
      features: [
        "Student pricing",
        "Valid student ID required",
        "General admission seating",
        "Concert program included",
      ],
    },
    {
      id: "vip-single",
      name: "VIP Single",
      price: 25000,
      description: "Premium seating with exclusive perks",
      image: "/images/VIP single.jpg",
      available: 30,
      features: [
        "Front row premium seating",
        "Complimentary refreshments",
        "Meet & greet opportunity",
        "Exclusive VIP lounge access",
        "Premium concert program",
      ],
    },
    {
      id: "vip-couple",
      name: "VIP Couple",
      price: 50000,
      description: "Perfect for couples seeking a premium experience",
      image: "/images/VIP couple.jpg",
      available: 20,
      features: [
        "Two premium seats together",
        "Complimentary champagne",
        "Meet & greet opportunity",
        "Exclusive VIP lounge access",
        "Premium concert programs (2)",
        "Special couple photo opportunity",
      ],
    },
    {
      id: "table",
      name: "Table Booking",
      price: 200000,
      description: "Reserved table for groups with premium service",
      image: "/images/Table.jpg",
      available: 10,
      features: [
        "Reserved table for up to 8 people",
        "Premium bottle service",
        "Dedicated server",
        "Best viewing position",
        "Complimentary catering",
        "Group photo with artists",
      ],
    },
  ];

  const handleTicketSelect = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="relative bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Choose Your Experience
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Select the perfect ticket type for Village Square Concert 5th
              Edition
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group relative overflow-hidden"
            >
              {/* Ticket Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {ticket.id === "vip-single" ||
                ticket.id === "vip-couple" ||
                ticket.id === "table" ? (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </span>
                  </div>
                ) : null}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{ticket.name}</h3>
                  <p className="text-white/90 text-sm">{ticket.description}</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-primary-400">
                      ₦{ticket.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      {ticket.available} available
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {ticket.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handleTicketSelect(ticket)}
                  disabled={ticket.available === 0}
                  className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ticket.available === 0 ? "Sold Out" : "Select Ticket"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Our Tickets?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We ensure a premium experience with secure payments, instant
              delivery, and outstanding customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Instant Delivery
              </h3>
              <p className="text-gray-300">
                Receive your tickets immediately after payment via email with QR
                codes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Secure Payment
              </h3>
              <p className="text-gray-300">
                Protected transactions through Paystack with multiple payment
                options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Premium Experience
              </h3>
              <p className="text-gray-300">
                Exceptional service and unforgettable memories at Port
                Harcourt's finest venue.
              </p>
            </div>
          </div>
        </div>
      </div>

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
