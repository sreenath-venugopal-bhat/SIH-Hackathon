import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { complaintsData } from "../../data/mockComplaints"; // Corrected Path
import StatusBadge from "../../components/StatusBadge"; // Corrected Path

export default function ComplaintDetail() {
  // Get the 'id' from the URL (e.g., /admin/complaints/1)
  const { id } = useParams();

  // Find the specific complaint from the data.
  // In a real app, this would be an API call: fetch(`/api/complaints/${id}`)
  const complaint = complaintsData.find((c) => c.id === parseInt(id));

  // Handle case where complaint is not found
  if (!complaint) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">
          Complaint not found
        </h2>
        <Link
          to="/admin/complaints"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          &larr; Back to all complaints
        </Link>
      </div>
    );
  }

  // Destructure all necessary fields, including the new 'description'
  const { title, image, description, submittedBy, date, status } = complaint;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* --- Header Section with Back Button --- */}
      <div className="mb-6">
        <Link
          to="/admin/complaints"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Complaints
        </Link>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image and Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Complaint Title */}
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
            {title}
          </h1>

          {/* Complaint Image */}
          <div>
            <img
              src={image.replace("w=50", "w=800")} // Request a larger image for the detail view
              alt={title}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-sm"
            />
          </div>
          
          {/* Complaint Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Submitted By Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Submission Details
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Submitted by:</span>{" "}
                {submittedBy.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {submittedBy.email}
              </p>
              <p>
                <span className="font-semibold">Date Reported:</span> {date}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Status and Actions */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">
            Manage Status
          </h2>

          <div className="space-y-4">
            {/* Current Status */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">
                Current Status:
              </span>
              <StatusBadge status={status} />
            </div>

            {/* Change Status Dropdown */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Update Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={status}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option>New</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Update Button */}
            <button className="w-full cursor-pointer bg-[#528226] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

