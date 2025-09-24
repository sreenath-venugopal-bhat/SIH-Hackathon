import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, BookOpen, Truck, ArrowRight, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Bin Locator",
      description: "Find nearby smart bins on an interactive map with real-time status updates.",
      icon: MapPin,
      path: "/bins",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
      delay: 0.1
    },
    {
      title: "Awareness Hub",
      description: "Learn how Ecodesh works and explore comprehensive waste management tips.",
      icon: BookOpen,
      path: "/awareness",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      delay: 0.2
    },
    {
      title: "Pickup Request",
      description: "Schedule smart waste pickup requests at your convenience with tracking.",
      icon: Truck,
      path: "/pickup-request",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-50",
      delay: 0.3
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4 border border-emerald-200"
          >
            <Sparkles size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Ecodesh</span> Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the future of waste management with our intelligent, user-friendly features designed for sustainability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              onClick={() => navigate(feature.path)}
              className="group cursor-pointer relative"
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 ${feature.bgColor} rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100`} />
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 group-hover:border-emerald-200/50 transition-all duration-300 p-8 h-full flex flex-col">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <feature.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                  {feature.description}
                </p>

                {/* CTA Button */}
                

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${feature.color} rounded-tr-3xl rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.3
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">Ready to make a difference?</p>




<Link to="/awareness">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-400/50"
  >
    Awareness Hub
  </motion.button>
</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;