import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";

export default function ComplaintRow({ complaint }) {
  const { id, title, submittedBy, date, status, category } = complaint;

  return (
    <>
      {/* --- Desktop/Tablet View --- */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50">
        <div className="col-span-3 font-semibold text-gray-800">{title}</div>
        <div className="col-span-2">
          <CategoryBadge category={category} />
        </div>
        <div className="col-span-3">
          <p className="font-medium text-gray-900">{submittedBy.name}</p>
          <p className="text-sm text-gray-500">{submittedBy.email}</p>
        </div>
        <div className="col-span-2 text-gray-600">{date}</div>
        <div className="col-span-1">
          <StatusBadge status={status} />
        </div>
        <div className="col-span-1 text-right">
          <Link
            to={`/admin/complaints/${id}`}
            className="text-emerald-600 hover:underline font-medium"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* --- Mobile View --- */}
      <div className="md:hidden p-4 border-b border-gray-200 hover:bg-gray-50">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-800 text-lg mr-4">{title}</h3>
          <div className="flex-shrink-0">
            <CategoryBadge category={category} />
          </div>
        </div>
        <div className="mb-3 space-y-1">
          <div className="flex items-center text-sm">
            <span className="text-gray-500 font-medium mr-2">
              Submitted by:
            </span>
            <span className="text-gray-800">{submittedBy.name}</span>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-gray-500 text-sm">{date}</div>
          <StatusBadge status={status} />
        </div>
        <div className="text-center pt-3 border-t border-gray-100">
          <Link
            to={`/admin/complaints/${id}`}
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium text-sm w-full text-center transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
