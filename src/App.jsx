import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

import AdminLayout from "./pages/admin/AdminLayout";
import ViewComplaints from "./pages/admin/ViewComplaints";
import SetBinLocations from "./pages/admin/SetBinLocations";
import ComplaintDetail from "./pages/admin/ComplaintDetail";
import AddAdmin from "./pages/admin/AddAdmin";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import WasteManagementAwareness from "./components/Awareness";
import FindBins from "./pages/FindBins";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-bins" element={<FindBins/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Child routes will render inside AdminLayout's <Outlet> */}
          <Route index element={<ViewComplaints />} />
          <Route path="complaints" element={<ViewComplaints />} />
          <Route path="complaints/:id" element={<ComplaintDetail />} />
          <Route path="set-bins" element={<SetBinLocations />} />
          <Route path="analytics" element={< AnalyticsPage/>} />
          <Route path="add-admin" element={<AddAdmin />} />
        </Route>
        <Route path="/awareness" element={<WasteManagementAwareness />} />
      </Routes>
    </BrowserRouter>
  );
}
