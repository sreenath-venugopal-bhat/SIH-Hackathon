import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

import AdminLayout from "./pages/admin/AdminLayout";
import ViewComplaints from "./pages/admin/ViewComplaints";
import SetBinLocations from "./pages/admin/SetBinLocations";
import ComplaintDetail from "./pages/admin/ComplaintDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          {/* Child routes will render inside AdminLayout's <Outlet> */}
          <Route index element={<ViewComplaints />} />
          <Route path="complaints" element={<ViewComplaints />} />
          <Route path="complaints/:id" element={<ComplaintDetail />} />
          <Route path="set-bins" element={<SetBinLocations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
