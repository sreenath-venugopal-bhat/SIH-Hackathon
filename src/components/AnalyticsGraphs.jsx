import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  Truck,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
} from "lucide-react";

const pieData = [
  {
    name: "Active Users",
    value: 120,
    icon: Users,
    color: "#4ade80",
    description: "Registered users",
  },
  {
    name: "Pickups Completed",
    value: 80,
    icon: Truck,
    color: "#60a5fa",
    description: "Successful pickups",
  },
  {
    name: "Complaints Solved",
    value: 50,
    icon: CheckCircle,
    color: "#facc15",
    description: "Resolved issues",
  },
  {
    name: "Pending Complaints",
    value: 15,
    icon: AlertCircle,
    color: "#f87171",
    description: "In progress",
  },
];

const radialData = [
  {
    name: "Success Rate",
    value: 77,
    fill: "#4ade80",
    target: 85,
    icon: Target,
  },
  {
    name: "Efficiency",
    value: 88,
    fill: "#60a5fa",
    target: 90,
    icon: TrendingUp,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-2xl"
      >
        <p className="font-bold text-gray-800">{payload[0].name}</p>
        <p
          className="text-lg font-semibold"
          style={{ color: payload[0].payload.fill }}
        >
          {payload[0].value}%
        </p>
        <p className="text-sm text-gray-600">
          Target: {payload[0].payload.target}%
        </p>
      </motion.div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <p className="font-bold text-gray-800">{data.name}</p>
        </div>
        <p className="text-lg font-semibold text-gray-900">{data.value}</p>
        <p className="text-sm text-gray-600">{data.description}</p>
      </motion.div>
    );
  }
  return null;
};

const RenderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
      stroke="black"
      strokeWidth={1}
      strokeOpacity={0.5}
    >
      {value}
    </text>
  );
};

export default function Analytics() {
  const [animatedValues, setAnimatedValues] = useState(pieData.map(() => 0));
  const [radialAnimated, setRadialAnimated] = useState(radialData.map(() => 0));

  useEffect(() => {
    const pieTimer = setTimeout(() => {
      setAnimatedValues(pieData.map((item) => item.value));
    }, 500);

    const radialTimer = setTimeout(() => {
      setRadialAnimated(radialData.map((item) => item.value));
    }, 800);

    return () => {
      clearTimeout(pieTimer);
      clearTimeout(radialTimer);
    };
  }, []);

  return (
    <div className="p-6 grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Pie Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative group h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 p-6 transition-all duration-500 overflow-hidden h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                System Overview
              </h2>
              <p className="text-gray-600">Real-time distribution analytics</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Live
            </div>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
            <div className="relative h-72 w-72 mx-auto lg:mx-0 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieData.map((item, index) => ({
                      ...item,
                      value: animatedValues[index],
                    }))}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                    label={RenderCustomizedLabel}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="white"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-gray-200 min-w-[80px]">
                  <span className="text-sm font-semibold text-gray-600 block">
                    Total
                  </span>
                  <span className="text-xl font-black bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    {animatedValues.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 w-full">
              <div className="space-y-3">
                {pieData.map((entry, index) => (
                  <motion.div
                    key={`legend-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: entry.color }}
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700 block">
                          {entry.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {entry.description}
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {animatedValues[index]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Radial Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative group h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 p-6 transition-all duration-500 overflow-hidden h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Performance Metrics
              </h2>
              <p className="text-gray-600">Efficiency and success rates</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Optimized
            </div>
          </motion.div>
          <div className="flex flex-col items-center flex-1 justify-between">
            <div className="relative h-72 w-72 mb-4 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="80%"
                  barSize={16}
                  data={radialData.map((item, index) => ({
                    ...item,
                    value: radialAnimated[index],
                  }))}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <RadialBar
                    minAngle={15}
                    label={{
                      position: "insideStart",
                      fill: "#fff",
                      fontSize: 12,
                      fontWeight: "bold",
                      formatter: (value) => `${value}%`,
                    }}
                    background={{
                      fill: "#f8fafc",
                      stroke: "#e2e8f0",
                      strokeWidth: 1,
                    }}
                    clockWise
                    dataKey="value"
                    cornerRadius={8}
                  >
                    {radialData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </RadialBar>
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-gray-200">
                  <span className="text-sm font-semibold text-gray-600 block">
                    Avg.
                  </span>
                  <span className="text-xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {((radialAnimated[0] + radialAnimated[1]) / 2).toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-auto">
              {radialData.map((entry, index) => (
                <motion.div
                  key={`radial-legend-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <entry.icon
                      className="h-5 w-5"
                      style={{ color: entry.fill }}
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 block">
                        {entry.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Target: {entry.target}%
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-lg font-bold ml-auto"
                    style={{ color: entry.fill }}
                  >
                    {radialAnimated[index]}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
