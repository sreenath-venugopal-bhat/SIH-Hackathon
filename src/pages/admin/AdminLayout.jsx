import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <AdminNavbar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}