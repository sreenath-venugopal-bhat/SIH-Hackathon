import React from "react";

// A simple, reusable badge for displaying the complaint category.
export default function CategoryBadge({ category }) {
  if (!category) return null;

  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-200 rounded-full whitespace-nowrap">
      {category}
    </span>
  );
}
