import React from "react";
import { motion } from "framer-motion";
import { Users, Truck, CheckCircle, AlertCircle, MapPin, TrendingUp, Sparkles } from "lucide-react";

const stats = [
  { 
    title: "Total Users", 
    value: 1200, 
    icon: Users, 
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    delay: 0.1,
    trend: "+12%"
  },
  { 
    title: "Pickups Completed", 
    value: 850, 
    icon: Truck, 
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    delay: 0.2,
    trend: "+8%"
  },
  { 
    title: "Pending Complaints", 
    value: 32, 
    icon: AlertCircle, 
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    delay: 0.3,
    trend: "-5%"
  },
  { 
    title: "Resolved Complaints", 
    value: 210, 
    icon: CheckCircle, 
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    delay: 0.4,
    trend: "+15%"
  },
  { 
    title: "Active Bins", 
    value: 75, 
    icon: MapPin, 
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    delay: 0.5,
    trend: "+20%"
  },
];

const StatsCards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Section title with animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Platform Overview</h2>
        <p className="text-gray-600">Real-time statistics and performance metrics</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group relative"
          >
            {/* Hover effect background */}
            <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100`} />
            
            <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border ${stat.borderColor} group-hover:border-transparent p-6 transition-all duration-500 overflow-hidden`}>
              
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-sm group-hover:blur-0 transition-all duration-500`} />
                <div className="absolute inset-[1px] rounded-2xl bg-white" />
              </div>

              <div className="relative z-10">
                {/* Header with icon and trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: stat.delay + 0.5 }}
                    className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full border"
                  >
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-semibold text-gray-600">{stat.trend}</span>
                  </motion.div>
                </div>

                {/* Value with counting animation */}
                <motion.p 
                  className="text-3xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: stat.delay + 0.3 }}
                >
                  {stat.value}
                </motion.p>

                {/* Title */}
                <h3 className="text-gray-500 text-sm font-medium mb-3">{stat.title}</h3>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stat.value / 1500) * 100, 100)}%` }}
                    transition={{ delay: stat.delay + 0.7, duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>

                {/* Sparkle effect on hover */}
                <motion.div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                      x: Math.random() * 40 - 20,
                      y: Math.random() * 40 - 20
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.3
                    }}
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + i * 10}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsCards;