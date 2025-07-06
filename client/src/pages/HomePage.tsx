import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Star,
  Users,
  Ticket,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const ticketTypes = [
    {
      id: "student",
      name: "Student",
      price: "₦2,000",
      features: [
        "General Admission",
        "Valid Student ID Required",
        "Concert Program Included",
        "Access to All Performances",
      ],
      image: "/images/STUDENTS.jpg",
      icon: "🎓",
    },
    {
      id: "regular",
      name: "Regular",
      price: "₦5,000",
      features: [
        "General Admission",
        "Reserved Seating",
        "Concert Program",
        "Refreshment Access",
      ],
      image: "/images/Regular TIcket.jpg",
      icon: "🎵",
    },
    {
      id: "vip-single",
      name: "VIP Single",
      price: "₦25,000",
      features: [
        "Premium Seating",
        "Welcome Refreshments",
        "Meet & Greet Opportunity",
        "Exclusive Merchandise",
        "Priority Entry",
      ],
      image: "/images/VIP single.jpg",
      icon: "⭐",
    },
    {
      id: "vip-couple",
      name: "VIP Couple",
      price: "₦50,000",
      features: [
        "Premium Couple Seating",
        "Champagne Welcome",
        "Photo Opportunity",
        "Exclusive Lounge Access",
        "Premium Gift Package",
      ],
      image: "/images/VIP couple.jpg",
      icon: "💑",
    },
    {
      id: "table",
      name: "Table (8 People)",
      price: "₦200,000",
      features: [
        "Private Table for 8",
        "Dedicated Service Staff",
        "Reserved VIP Parking",
        "Premium Catering Package",
        "Complimentary Photography",
      ],
      image: "/images/Table.jpg",
      icon: "🍽️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/NCV main banner.jpg"
            alt="De Noble Choral Voices Concert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
              De Noble Choral Voices
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block mb-3">Village Square</span>
              <span className="block text-secondary-400 text-4xl md:text-6xl">
                Choral S5
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Chants, Folktales & Punchlines of the Motherland
            </p>

            <div className="flex flex-col space-y-4 text-white/90 text-sm md:text-base">
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="h-4 w-4 text-secondary-400" />
                <span>Sunday, 28th September 2025</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-4 w-4 text-secondary-400" />
                <span>5:00 PM - 8:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-4 w-4 text-secondary-400" />
                <span>Oasis Event Centre, Port Harcourt</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                to="/tickets"
                className="btn-primary text-lg px-8 py-4 rounded-xl font-semibold"
              >
                <Ticket className="mr-2 h-5 w-5" />
                Get Your Tickets
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Village Square Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us for an authentic celebration of African heritage through
              chants, folktales, and punchlines that connect us to our
              motherland.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div className="card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        Authentic Folk Heritage
                      </h3>
                      <p className="text-gray-300">
                        Experience traditional chants and folktales passed down
                        through generations, bringing rich cultural heritage to
                        life.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary-600 flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        Village Square Atmosphere
                      </h3>
                      <p className="text-gray-300">
                        Immerse yourself in the communal spirit where stories,
                        laughter, and music unite hearts and minds.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-600 flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        Professional Excellence
                      </h3>
                      <p className="text-gray-300">
                        World-class acoustics, professional staging, and premium
                        hospitality for an unforgettable experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/Main Big Image.jpg"
                  alt="Performance"
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Seat
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From student-friendly options to premium VIP experiences, find the
              perfect way to enjoy our cultural celebration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ticketTypes.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 hover:border-primary-500 transition-all duration-200"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{ticket.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {ticket.name}
                  </h3>
                  <p className="text-3xl font-bold text-primary-400">
                    {ticket.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {ticket.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/tickets" className="w-full btn-primary text-center">
                  Select Ticket
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Have questions about the event? We're here to help make your
              Village Square experience unforgettable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-6 text-center">
                <Phone className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+234 123 456 7890</p>
              </div>

              <div className="card p-6 text-center">
                <Mail className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-300">info@dncv.com</p>
              </div>

              <div className="card p-6 text-center">
                <MapPin className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Venue</h3>
                <p className="text-gray-300">Oasis Event Centre</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-6 w-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="h-6 w-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Facebook className="h-6 w-6 text-white" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">
                De Noble Choral Voices
              </h3>
            </div>

            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Celebrating African heritage through music, storytelling, and
              community. Join us for an unforgettable cultural experience.
            </p>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2025 De Noble Choral Voices. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
