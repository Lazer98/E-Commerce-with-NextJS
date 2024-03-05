import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/2 relative">
        <img
          src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="object-cover w-full h-full ml-4 mr-9"
          alt="Banner"
        />
      </div>
      <div className="flex flex-col justify-center h-1/2 relative overflow-hidden sm:flex-row">
        <div className="w-full sm:w-1/3 p-4 relative overflow-hidden">
          <Link href="/Pants">
            <div>
              <img src="https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full shadow-lg rounded-lg" alt="Product 1" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-1xl text-gray-100">Jeans are beautiful.</p>
            </div>
          </Link>
        </div>
        <div className="w-full sm:w-1/3 p-4 relative overflow-hidden">
          <Link href="/Shoes">
            <div>
              <img src="https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full shadow-lg rounded-lg" alt="Product 2" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-1xl text-gray-100">Amazing new designs.</p>
            </div>
          </Link>
        </div>
        <div className="w-full sm:w-1/3 p-4 relative overflow-hidden">
          <Link href="/searchForProduct/searchForProduct?searchForProduct=winter">
            <div>
              <img src="https://images.pexels.com/photos/7037459/pexels-photo-7037459.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full shadow-lg rounded-lg" alt="Product 3" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-1xl text-gray-100">Winter is coming.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
