import React, { useState, useMemo } from 'react';
import ComplaintRow from '../../components/ComplaintRow';
import { complaintsData } from '../../data/mockComplaints';
import FilterControls from '../../components/FilterControls';

export default function ViewComplaints() {
  // State to hold the current filter values from the FilterControls component
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    place: '',
  });

  // useMemo is a performance optimization.
  // It ensures the list is only re-filtered when the complaints data or the filters change.
  const filteredComplaints = useMemo(() => {
    return complaintsData.filter(complaint => {
      // If a filter is set, check if the complaint matches. Otherwise, it's a match.
      const statusMatch = filters.status ? complaint.status === filters.status : true;
      const categoryMatch = filters.category ? complaint.category === filters.category : true;
      
      // The place filter searches the complaint's title, description, and location name
      const placeMatch = filters.place 
        ? (complaint.title.toLowerCase().includes(filters.place.toLowerCase()) ||
          complaint.description.toLowerCase().includes(filters.place.toLowerCase()) ||
          (complaint.location && complaint.location.name.toLowerCase().includes(filters.place.toLowerCase())))
        : true;
      
      // The complaint must match all active filters to be included
      return statusMatch && categoryMatch && placeMatch;
    });
  }, [filters]); // Dependency array: this code re-runs only when 'filters' change

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Complaints</h1>

      {/* --- Filter Controls --- */}
      {/* The `onFilterChange` prop connects the child component's state to this parent component */}
      <FilterControls onFilterChange={setFilters} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="col-span-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Complaint</h2>
          <h2 className="col-span-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</h2>
          <h2 className="col-span-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted By</h2>
          <h2 className="col-span-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</h2>
          <h2 className="col-span-1 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h2>
          <h2 className="col-span-1"></h2>
        </div>

        {/* --- Filtered Complaint List --- */}
        {/* We now map over the 'filteredComplaints' array */}
        <div>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <ComplaintRow key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <h3 className="text-lg font-semibold">No Complaints Found</h3>
              <p>Try adjusting or clearing your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}