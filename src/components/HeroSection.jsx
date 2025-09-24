import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button"; // Corrected import path
import { Card } from "./ui/Card"; // Corrected import path
import { Leaf, BarChart3, Users, ArrowRight, Sparkles, Recycle } from "lucide-react";

// --- For the animated background to work ---
// Add the following to your `tailwind.config.js` file:
/*
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
*/

const HeroSection = () => {
  const stats = [
    { icon: Leaf, value: "120+", label: "Tons Recycled", delay: 0.1 },
    { icon: BarChart3, value: "85%", label: "Efficiency Rate", delay: 0.2 },
    { icon: Users, value: "500+", label: "Active Users", delay: 0.3 },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A3D2E] from-emerald-500 via-green-500 to-teal-500 flex items-center justify-center py-20 px-6">
      {/* Enhanced background with lighter colors */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        {/* Ensure you add the keyframes and animation to tailwind.config.js */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-400/20 to-teal-400/30 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-200/40 rounded-full"
            initial={{ 
              opacity: 0,
              y: Math.random() * 100,
              x: Math.random() * 100
            }}
            animate={{ 
              opacity: [0, 1, 0],
              y: Math.random() * 1000,
              x: Math.random() * 100 + 100
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            // --- ERROR WAS HERE ---
            // Corrected the style object syntax
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            // --------------------
          />
        ))}

        {/* Lighter blobs */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-emerald-400/20 rounded-full blur-3xl -top-96 -left-96"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] bg-yellow-200/25 rounded-full blur-3xl -bottom-96 -right-96"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional light accent */}
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-teal-300/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg"
          >
            <Sparkles size={16} className="text-yellow-200" />
            <span className="text-sm font-medium text-white">Sustainable Future Starts Here</span>
            <Recycle size={16} className="text-emerald-200" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white"
          >
            Welcome to{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 relative inline-block"
            >
              EcoDesh
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6"
              >
                <Leaf className="w-full h-full text-yellow-200" />
              </motion.div>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl md:text-2xl text-emerald-50 max-w-2xl leading-relaxed font-medium"
          >
            Transform waste management with AI-powered analytics and real-time monitoring. 
            Make sustainable decisions that impact our planet positively.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button className="curosor-pointer flex items-center group px-8 py-4 bg-[#0F5257] text-green-800 font-bold rounded-2xl hover:from-yellow-200 hover:to-yellow-300 transform hover:scale-105 transition-all duration-400 shadow-2xl shadow-yellow-400/40 border-2 cursor-pointer">
              View Analytics Dashboard
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 border-2 border-white/40 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white/20 hover:border-white/60 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 max-w-2xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay + 0.5, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="p-8 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 flex flex-col items-center text-center shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  <stat.icon size={42} className="mb-4 text-yellow-200 group-hover:scale-110 transition-transform duration-300" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-200/30 rounded-full blur-md"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
                  {stat.value}
                </h3>
                <p className="text-emerald-50 font-medium">{stat.label}</p>
                <motion.div 
                  className="w-0 group-hover:w-12 h-1 bg-yellow-200 mt-3 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Recycle size={120} className="text-white animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <Leaf size={100} className="text-white animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
