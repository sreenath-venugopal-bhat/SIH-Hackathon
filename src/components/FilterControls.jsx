import React, { useState } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid";

const categories = [
  "Illegal Dumping",
  "Overflowing Bins",
  "Hazardous Waste",
  "Public Area Litter",
  "Recycling Issues",
  "Bin Request",
  "Other",
];
const statuses = ["New", "In Progress", "Resolved"];

export default function FilterControls({ onFilterChange }) {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");

  const handleFilter = () => {
    onFilterChange({ status, category, place });
  };

  const handleClear = () => {
    setStatus("");
    setCategory("");
    setPlace("");
    onFilterChange({ status: "", category: "", place: "" });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Place Filter */}
        <div>
          <label
            htmlFor="place"
            className="block text-sm font-medium text-gray-700"
          >
            Place
          </label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="e.g., Edappally, Kochi"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="w-full flex justify-center items-center bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700 transition cursor-pointer"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button
            onClick={handleClear}
            className="w-full flex justify-center items-center bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5 mr-2" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
