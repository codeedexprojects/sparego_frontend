// components/admin/ProtectedRoute.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
      setAllowed(false);
      setChecking(false);
      return;
    }
    // If token exists, allow access (backend 401s will still be handled per-page)
    setAllowed(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!allowed) return null;
  return children;
}