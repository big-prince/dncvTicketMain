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
  Crown,
  Heart,
  Sparkles,
  Trophy,
  Shield,
  Award,
  Volume2,
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
        "Special Student Seating Area",
      ],
      image: "/images/STUDENTS.jpg",
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
      features: [
        "Reserved Seating",
        "Concert Program",
        "Refreshment Access",
        "Photo Opportunity",
        "Event Merchandise Discount",
      ],
      image: "/images/Regular TIcket.jpg",
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
      features: [
        "Premium Front Row Seating",
        "Welcome Cocktail & Canapés",
        "Exclusive Meet & Greet",
        "Signed Merchandise Package",
        "Priority Entry & Parking",
        "Professional Photos",
      ],
      image: "/images/VIP single.jpg",
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
      features: [
        "Premium Couple Seating",
        "Champagne & Gourmet Dinner",
        "Private Photo Session",
        "Exclusive VIP Lounge Access",
        "Luxury Gift Package",
        "Concierge Service",
      ],
      image: "/images/VIP couple.jpg",
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
      features: [
        "Private VIP Table for 6",
        "Dedicated Butler Service",
        "Premium Catering Menu",
        "Reserved VIP Parking",
        "Professional Event Photography",
        "Custom Celebration Setup",
        "Complimentary Wine Selection",
      ],
      image: "/images/Table.jpg",
      icon: Trophy,
      popular: true,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-500/10 to-orange-600/10",
      iconBg: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/60 to-black/100 z-10"></div>
          <img
            src="/images/NCV MAIN2.jpg"
            alt="De Noble Choral Voices Concert"
            className="w-full h-full object-cover transform scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-30 floating-animation"></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-40 floating-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full opacity-20 floating-animation"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg border border-amber-300/30 rounded-full text-amber-100 text-xs sm:text-sm font-medium font-display tracking-widest uppercase shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="inline w-4 h-4 mr-2 text-amber-200" />
              De Noble Choral Voices
              <Sparkles className="inline w-4 h-4 ml-2 text-amber-200" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight"
            >
              <motion.span
                className="block mb-2 sm:mb-4 md:mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  textShadow:
                    "0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(245, 158, 11, 0.2)",
                  filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))",
                }}
              >
                Village Square
              </motion.span>
              <motion.span
                className="block text-transparent bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400 bg-clip-text text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-elegant font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  filter: "drop-shadow(0 0 30px rgba(245, 158, 11, 0.6))",
                }}
              >
                Chorale (Episode 5)
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto my-8 rounded-full shadow-lg"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed font-elegant font-light tracking-wide"
            >
              <span className="text-amber-200 font-medium">
                Chants, Folktales & Punchlines
              </span>{" "}
              of the Motherland
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-white/90 text-sm sm:text-base md:text-lg font-body mt-8 sm:mt-12"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all duration-300 group"
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0" />
                <span className="font-medium group-hover:text-amber-200 transition-colors duration-300 text-center">
                  Sunday, 28th September 2025
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all duration-300 group"
              >
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0" />
                <span className="font-medium group-hover:text-amber-200 transition-colors duration-300 text-center">
                  5:00 PM - 8:00 PM
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all duration-300 group"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0" />
                <span className="font-medium group-hover:text-amber-200 transition-colors duration-300 text-center">
                  Oasis Event Centre
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 hover:border-amber-400/50 transition-all duration-300 group"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 flex-shrink-0" />
                <span className="font-medium group-hover:text-amber-200 transition-colors duration-300 text-center">
                  #12 Psychiatric Hospital Road, Rumuola, PH
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-12 sm:pt-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/tickets"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-display font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Ticket className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Get Your Tickets</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-display font-semibold text-white border-2 border-white/40 rounded-2xl sm:rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:border-amber-400/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:text-amber-300 transition-colors duration-300 relative z-10">
                    Learn More
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight"
            >
              Village Square{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Experience
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8 rounded-full"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-elegant font-light"
            >
              Join us as we serenade you with songs, poems and stories that
              offer warmth and excitement.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <div className="premium-card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:border-amber-400/30 relative overflow-hidden">
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start space-x-6 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Volume2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                          Authentic Folk Heritage
                        </h3>
                        <p className="text-gray-300 leading-relaxed font-body group-hover:text-gray-200 transition-colors duration-300">
                          Experience traditional chants and folktales passed
                          down through generations, bringing rich cultural
                          heritage to life through powerful storytelling.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group"
                >
                  <div className="premium-card p-6 sm:p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:border-amber-400/30 relative overflow-hidden">
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start space-x-4 sm:space-x-6 relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-200 transition-colors duration-300">
                          Village Square Atmosphere
                        </h3>
                        <p className="text-gray-300 leading-relaxed font-body group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                          Be part of this scintillating atmosphere that
                          showcases the rich and diverse heritage of the African
                          culture in a communal setting.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="group"
                >
                  <div className="premium-card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:border-amber-400/30 relative overflow-hidden">
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex items-start space-x-6 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                          Professional Excellence
                        </h3>
                        <p className="text-gray-300 leading-relaxed font-body group-hover:text-gray-200 transition-colors duration-300">
                          Trust your favorite choir to deliver an exquisite
                          performance that celebrates the African heritage, and
                          ultimately, glorifies God. You don't wanna miss this!
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 group">
                <img
                  src="/images/Main Big Image.jpg"
                  alt="Performance"
                  className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Overlay Content */}
                <div className="hidden absolute bottom-8 left-8 right-8 text-white">
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-amber-200">
                      An Unforgettable Experience
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Join us for an evening of cultural celebration and musical
                      excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section
        id="tickets"
        className="py-32 bg-gray-950 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,158,11,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight"
            >
              Choose Your{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Experience
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8 rounded-full"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-elegant font-light"
            >
              From student options to premium VIP experiences, find the perfect
              way to enjoy our cultural celebration.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ticketTypes.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
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

                  {/* Large Icon Background */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <ticket.icon className="w-16 h-16 text-white" />
                  </div>

                  <div className="text-center mb-8 relative z-10">
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${ticket.iconBg} flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      whileHover={{ rotate: 12 }}
                    >
                      <ticket.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-3xl font-serif font-bold text-white mb-4 group-hover:text-amber-200 transition-colors duration-300">
                      {ticket.name}
                    </h3>

                    <div className="relative">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-5xl font-display font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                          {ticket.price}
                        </span>
                      </div>
                      <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 relative z-10 flex-1">
                    {ticket.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-start text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10"
                  >
                    <Link
                      to={`/tickets?selected=${ticket.id}`}
                      className={`w-full ${
                        ticket.popular
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl shadow-amber-500/30"
                          : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-amber-500 hover:to-orange-500"
                      } text-white font-display font-semibold py-4 px-6 rounded-2xl transition-all duration-300 text-center block group-hover:shadow-2xl group-hover:shadow-amber-500/25 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Ticket className="w-5 h-5" />
                        {ticket.popular ? "Choose Popular" : "Select Ticket"}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              Get In{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Touch
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-elegant font-light">
              Have questions about the event? We're here to help make your
              Village Square experience unforgettable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300 text-center">
                      Phone
                    </h3>
                    <div className="space-y-2 text-center">
                      <p className="text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300">
                        +234 814 934 9466
                      </p>
                      <p className="text-gray-400 font-body text-sm">Jack</p>
                      <p className="text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300">
                        +234 806 868 3392
                      </p>
                      <p className="text-gray-400 font-body text-sm">Elvis</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group"
              >
                <div className="card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-110">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-green-200 transition-colors duration-300 text-center">
                      Email
                    </h3>
                    <p className="text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300 text-center break-words">
                      denoblechoralvoices@gmail.com
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group"
              >
                <div className="card p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 backdrop-blur-sm hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300 text-center">
                      Venue
                    </h3>
                    <div className="text-center">
                      <p className="text-gray-300 font-body group-hover:text-gray-200 transition-colors duration-300 font-semibold">
                        Oasis Event Centre
                      </p>
                      <p className="text-gray-400 font-body text-sm mt-2">
                        #12 Psychiatric Hospital Road, Rumuola, PH
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center space-x-6 mt-16"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 group"
              >
                <Instagram className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 group"
              >
                <Twitter className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 group"
              >
                <Facebook className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-950 to-black py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center space-x-4 mb-12"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-serif font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                De Noble Choral Voices
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 mb-12 max-w-4xl mx-auto font-elegant font-light text-xl leading-relaxed"
            >
              Celebrating African heritage through music, storytelling, and
              community. Join us for an unforgettable cultural experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-t border-gray-800/50 pt-12"
            >
              <p className="text-gray-500 font-body text-lg">
                © 2025 De Noble Choral Voices. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
