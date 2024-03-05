import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProtectedRoute from './ProtectedRoute';
import Link from 'next/link';

export default function Pants() {
  const router = useRouter();

  useEffect(() => {
 
  }, []);

  const openPaypal = () => {
    router.push("/PayPal");
  };
  return (
    <ProtectedRoute>
    <div className="bg-white">
      <Link href="/PayPal"> 
        <div className="bg-white rounded-full shadow-lg overflow-hidden w-64 h-32 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-lg font-semibold hover:text-white">Pay with PayPal</h2>
          </div>
        </div></Link>
    </div>
    </ProtectedRoute>
  );
}
