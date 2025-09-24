import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Dummy district complaints data
const districtComplaintsData = [
  {
    district: "Kochi",
    total: 120,
    resolved: 90,
    pending: 30,
    resolutionRate: 75,
  },
  {
    district: "Trivandrum",
    total: 100,
    resolved: 70,
    pending: 30,
    resolutionRate: 70,
  },
  {
    district: "Kozhikode",
    total: 80,
    resolved: 60,
    pending: 20,
    resolutionRate: 75,
  },
  {
    district: "Kannur",
    total: 60,
    resolved: 45,
    pending: 15,
    resolutionRate: 75,
  },
  {
    district: "Thrissur",
    total: 85,
    resolved: 65,
    pending: 20,
    resolutionRate: 76.5,
  },
  {
    district: "Kollam",
    total: 70,
    resolved: 50,
    pending: 20,
    resolutionRate: 71.4,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-2xl min-w-[200px]"
      >
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="font-semibold text-red-500">{data.total}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-gray-600">Resolved:</span>
            <span className="font-semibold text-green-500">
              {data.resolved}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-gray-600">Pending:</span>
            <span className="font-semibold text-yellow-500">
              {data.pending}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4 pt-1 border-t border-gray-100">
            <span className="text-sm text-gray-600">Success Rate:</span>
            <span className="font-bold text-blue-500">
              {data.resolutionRate}%
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  // Define colors for each data series
  const legendColors = {
    "Total Complaints": "#ef4444", // Red color for total
    "Resolved Complaints": "#22c55e", // Green color for resolved
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex justify-center gap-6 mb-4 flex-wrap"
    >
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: legendColors[entry.value] || entry.color,
            }}
          />
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

const ExtraInfo = () => {
  const [animatedData, setAnimatedData] = useState(
    districtComplaintsData.map((item) => ({ ...item, total: 0, resolved: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(districtComplaintsData);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Bar Chart Only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative group"
      >
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100/50 p-6 hover:shadow-3xl transition-all duration-500">
          {/* Chart Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                District-wise Complaint Analytics
              </h2>
              <p className="text-gray-600">Total vs Resolved Complaints</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Live Data
            </div>
          </motion.div>

          {/* Bar Chart */}
          <div className="relative h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={animatedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                barGap={10}
                barCategoryGap="20%"
              >
                <defs>
                  <linearGradient
                    id="totalGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient
                    id="resolvedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="district"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />

                {/* Total Complaints Bar */}
                <Bar
                  dataKey="total"
                  name="Total Complaints"
                  fill="url(#totalGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={35}
                >
                  {animatedData.map((entry, index) => (
                    <Cell key={`total-${index}`} />
                  ))}
                </Bar>

                {/* Resolved Complaints Bar */}
                <Bar
                  dataKey="resolved"
                  name="Resolved Complaints"
                  fill="url(#resolvedGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={35}
                >
                  {animatedData.map((entry, index) => (
                    <Cell key={`resolved-${index}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraInfo;
