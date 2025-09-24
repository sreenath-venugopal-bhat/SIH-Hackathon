import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function ComplaintRow({ complaint }) {
  const { id, title, image, submittedBy, date, status } = complaint;

  return (
    <>
      {/* Desktop/Tablet View */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50">
        {/* Complaint */}
        <div className="col-span-4 flex items-center">
          <span className="font-semibold text-gray-800">{title}</span>
        </div>

        {/* Submitted By */}
        <div className="col-span-3">
          <p className="font-medium text-gray-900">{submittedBy.name}</p>
          <p className="text-sm text-gray-500">{submittedBy.email}</p>
        </div>

        {/* Date */}
        <div className="col-span-2 text-gray-600">{date}</div>

        {/* Status */}
        <div className="col-span-2">
          <StatusBadge status={status} />
        </div>
        
        {/* Action Link */}
        <div className="col-span-1 text-right">
          <Link to={`/admin/complaints/${id}`} className="text-blue-600 hover:underline font-medium">
            View Details
          </Link>
        </div>
      </div>

      {/* Mobile View - Everything stacked vertically */}
      <div className="md:hidden p-4 border-b border-gray-200 hover:bg-gray-50">
        {/* Title at the top */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        </div>

        {/* Submitted By - Username and Email */}
        <div className="mb-3 space-y-1">
          <div className="flex items-center">
            <span className="text-gray-600 font-medium mr-2">Submitted by:</span>
            <span className="text-gray-900">{submittedBy.name}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 font-medium mr-2">Email:</span>
            <span className="text-gray-900 truncate">{submittedBy.email}</span>
          </div>
        </div>

        {/* Date and Status */}
        <div className="mb-3 flex items-center justify-between">
          <div className="text-gray-600 text-sm">{date}</div>
          <StatusBadge status={status} />
        </div>

        {/* View Details at the bottom */}
        <div className="text-center pt-2 border-t border-gray-100">
          <Link 
            to={`/admin/complaints/${id}`} 
            className="inline-block bg-[#669D31] text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}