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
            src="/images/NCV MAIN2.jpg"
            alt="De Noble Choral Voices Concert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/100"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium font-display tracking-wider">
              De Noble Choral Voices
            </div>

            <h1 className="font-serif text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="block mb-4 text-white">Village Square</span>
              <span className="block text-transparent bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-5xl md:text-7xl font-elegant font-medium">
                Chorale (Episode 5)
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-elegant font-light tracking-wide">
              Chants, Folktales & Punchlines of the Motherland
            </p>

            <div className="flex flex-col space-y-4 text-white/90 text-base md:text-lg font-body">
              <div className="flex items-center justify-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <Calendar className="h-5 w-5 text-amber-400" />
                <span className="font-medium">Sunday, 28th September 2025</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <Clock className="h-5 w-5 text-amber-400" />
                <span className="font-medium">5:00 PM - 8:00 PM</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span className="font-medium">Oasis Event Centre</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span className="font-medium">
                  #12 Psychiatric Hospital Road, Rumuola, PH
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                to="/tickets"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-display font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Ticket className="mr-3 h-6 w-6 relative z-10" />
                <span className="relative z-10">Get Your Tickets</span>
              </Link>
              <a
                href="#about"
                className="group inline-flex items-center justify-center px-10 py-4 text-lg font-display font-semibold text-white border-2 border-white/30 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="group-hover:text-amber-300 transition-colors duration-300">
                  Learn More
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              Village Square{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Experience
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-elegant font-light">
              Join us as we serenade you with songs, poems and stories that
              offer warmth and excitement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-10">
                <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-3">
                        Authentic Folk Heritage
                      </h3>
                      <p className="text-gray-300 leading-relaxed font-body">
                        Experience traditional chants and folktales passed down
                        through generations, bringing rich cultural heritage to
                        life.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-3">
                        Village Square Atmosphere
                      </h3>
                      <p className="text-gray-300 leading-relaxed font-body">
                        Be part of this scintillating atmosphere that showcases
                        the rich and diverse heritage of the African culture.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-3">
                        Professional Excellence
                      </h3>
                      <p className="text-gray-300 leading-relaxed font-body">
                        Trust your favorite choir to deliver an exquisite
                        perfomance that celebrates the African heritage, and
                        ultimately, glorifies God. You dont wanna miss this!!
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
      <section id="tickets" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              Choose Your{" "}
              <span className="text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                Experience
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-elegant font-light">
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
                className="group card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center mb-8">
                  <div className="text-6xl mb-6">{ticket.icon}</div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">
                    {ticket.name}
                  </h3>
                  <p className="text-4xl font-display font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                    {ticket.price}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {ticket.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 font-body"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/tickets"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-semibold py-4 px-6 rounded-2xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 text-center block group-hover:shadow-lg"
                >
                  Select Ticket
                </Link>
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
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
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
              <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                <Phone className="h-12 w-12 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  Phone
                </h3>
                <p className="text-gray-300 font-body">
                  +234 814 934 9466 - Jack
                </p>
                <p className="text-gray-300 font-body">
                  +234 806 868 3392 - Elvis
                </p>
              </div>

              <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                <Mail className="h-12 w-12 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  Email
                </h3>
                <p className="text-gray-300 font-body">
                  denoblechoralvoices@gmail.com
                </p>
              </div>

              <div className="card p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                <MapPin className="h-12 w-12 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-3">
                  Venue
                </h3>
                <p className="text-gray-300 font-body">Oasis Event Centre</p>
                <p className="text-gray-400 font-body text-sm mt-2">
                  #12 Psychiatric Hospital Road, Rumuola, PH
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-16">
              <a
                href="#"
                className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Instagram className="h-8 w-8 text-white" />
              </a>
              <a
                href="#"
                className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Twitter className="h-8 w-8 text-white" />
              </a>
              <a
                href="#"
                className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Facebook className="h-8 w-8 text-white" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Music className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-transparent bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text">
                De Noble Choral Voices
              </h3>
            </div>

            <p className="text-gray-400 mb-8 max-w-3xl mx-auto font-elegant font-light text-lg leading-relaxed">
              Celebrating African heritage through music, storytelling, and
              community. Join us for an unforgettable cultural experience.
            </p>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 font-body">
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
