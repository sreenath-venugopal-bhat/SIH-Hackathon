// Current Date for Logic: 2025-09-25
export const complaintsData = [
  {
    id: 1,
    title: "Overflowing Bin at Park",
    description:
      "The main garbage bin located near the children's playground has been overflowing for the past two days. It's attracting pests and creating an unsanitary environment.",
    category: "Overflowing Bins",
    submittedBy: {
      name: "Sophia Clark",
      email: "sophia.clark@email.com",
    },
    date: "2025-09-21", // Less than 2 days old
    status: "New", // Stays "New"
    location: {
      lat: 9.9816,
      lng: 76.2961,
      name: "Changampuzha Park, Edappally",
    },
  },
  {
    id: 2,
    title: "Illegal Dumping near River",
    description:
      "A large pile of construction debris has been illegally dumped along the riverbank trail, approximately 500 meters from the main bridge.",
    category: "Illegal Dumping",
    submittedBy: {
      name: "Ethan Miller",
      email: "ethan.miller@email.com",
    },
    date: "2025-09-23", // Exactly 2 days old
    status: "Pending", // Was "New", now automatically "Pending"
    location: {
      lat: 9.9669,
      lng: 76.2999,
      name: "Riverbank near Marine Drive Walkway",
    },
  },
  {
    id: 3,
    title: "Damaged Recycling Container",
    description:
      "The public recycling container on the corner of Oak Avenue and 12th Street is badly damaged, causing materials to spill out.",
    category: "Recycling Issues",
    submittedBy: {
      name: "Olivia Davis",
      email: "olivia.davis@email.com",
    },
    date: "2025-09-22", // More than 2 days old
    status: "Pending", // Was "In Progress", now automatically "Pending"
    location: {
      lat: 10.0275,
      lng: 76.3082,
      name: "Near Infopark Gate, Kakkanad",
    },
  },
  {
    id: 4,
    title: "Missed Collection - Main Street",
    description:
      "Our entire block on Main Street was missed during the scheduled waste collection this morning. Everyone's bins are still full.",
    category: "Other",
    submittedBy: {
      name: "Liam Wilson",
      email: "liam.wilson@email.com",
    },
    date: "2025-09-21", // Older than 2 days, but already Resolved
    status: "Resolved", // Stays "Resolved"
    location: {
      lat: 9.9312,
      lng: 76.2673,
      name: "M.G. Road, Central Kochi",
    },
  },
  {
    id: 5,
    title: "Hazardous Waste Reported",
    description:
      "There are chemical drums left near the old factory site. They need to be handled by professionals.",
    category: "Hazardous Waste",
    submittedBy: {
      name: "Chloe Garcia",
      email: "chloe.garcia@email.com",
    },
    date: "2025-09-25",
    status: "New",
    location: {
      lat: 10.0889,
      lng: 76.3248,
      name: "Industrial Area, Aluva",
    },
  },
];
