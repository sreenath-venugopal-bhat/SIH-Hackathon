{/*This is the status component.Shows the status of each complaint.*/}
import React from 'react';

export default function StatusBadge({ status }) {
  const baseStyle = 'px-3 py-1 text-xs font-medium rounded-full';
  
  let statusStyle;

  switch (status) {
    case 'New':
      statusStyle = 'bg-green-100 text-green-800';
      break;
    case 'In Progress':
      statusStyle = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Resolved':
      statusStyle = 'bg-gray-200 text-gray-700';
      break;
    default:
      statusStyle = 'bg-gray-100 text-gray-800';
  }

  return <span className={`${baseStyle} ${statusStyle}`}>{status}</span>;
}