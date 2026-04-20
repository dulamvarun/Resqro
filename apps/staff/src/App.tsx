import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const WaiterDashboard = lazy(() => import('./pages/WaiterDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        <p className="text-stone-50/60 text-sm font-semibold tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/waiter" replace />} />
          <Route path="/waiter" element={<WaiterDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

