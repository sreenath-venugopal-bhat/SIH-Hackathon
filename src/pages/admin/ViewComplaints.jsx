import React from 'react';
import ComplaintRow from '../../components/ComplaintRow';
import { complaintsData } from '../../data/mockComplaints';

export default function ViewComplaints() {
  const complaints = complaintsData;

  return (
    <div className="px-4 sm:px-0"> {/* Increased mobile padding */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">User Complaints</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="col-span-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Complaint</h2>
          <h2 className="col-span-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted By</h2>
          <h2 className="col-span-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</h2>
          <h2 className="col-span-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h2>
          <h2 className="col-span-1"></h2>
        </div>

        {/* Complaint List */}
        <div>
          {complaints.map((complaint) => (
            <ComplaintRow key={complaint.id} complaint={complaint} />
          ))}
        </div>
      </div>
    </div>
  );
}