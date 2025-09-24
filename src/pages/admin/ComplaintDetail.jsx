import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { complaintsData } from "../../data/mockComplaints";
import StatusBadge from "../../components/StatusBadge";
import CategoryBadge from "../../components/CategoryBadge";
import MiniMap from "../../components/MiniMap";

const allStatuses = ["New","Pending","Resolved"];

export default function ComplaintDetail() {
  const { id } = useParams();
  const complaint = complaintsData.find((c) => c.id === parseInt(id));

  // State to manage the status selected in the dropdown
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || "");

  if (!complaint) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">
          Complaint Not Found
        </h2>
        <Link
          to="/admin/complaints"
          className="mt-4 inline-block text-emerald-600 hover:underline"
        >
          &larr; Back to Complaints
        </Link>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    console.log(`--- STATUS UPDATE ---`);
    console.log(`Complaint ID: ${complaint.id}`);
    console.log(
      `Changing status from "${complaint.status}" to "${selectedStatus}"`
    );
    // --- BACKEND INTEGRATION POINT ---
    // Your friend will add the logic here to send this update to the database.
    alert(
      `Status for complaint #${complaint.id} has been updated to "${selectedStatus}"!`
    );
  };

  const { title, description, category, submittedBy, date, status, location } =
    complaint;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          to="/admin/complaints"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to All Complaints
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <div className="flex-shrink-0">
                <CategoryBadge category={category} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Location
            </h2>
            <p className="text-gray-600 mb-4">{location?.name}</p>
            <MiniMap center={location} locationName={location?.name} />
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Management Panel */}
          <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">
              Manage Status
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">
                  Current Status:
                </span>
                <StatusBadge status={status} />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Update Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {allStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStatusUpdate}
                className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition"
              >
                Update
              </button>
            </div>
          </div>

          {/* Submitter Info Panel */}
          <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">
              Submitter Details
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Name:</span> {submittedBy.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {submittedBy.email}
              </p>
              <p>
                <span className="font-medium">Date:</span> {date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
