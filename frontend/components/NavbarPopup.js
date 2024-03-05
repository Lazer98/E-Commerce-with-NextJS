import Link from 'next/link';
import {  selectNavbarIsVisible } from '../public/features/navbarSlice'; 
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { setNavbarIsVisible } from '../public/features/navbarSlice'; 

const NavbarPopup = () => {
    const navbarIsVisible = useSelector(selectNavbarIsVisible);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setNavbarIsVisible(false));
      };

      if(!navbarIsVisible){
        return ;
      }

  return (
    
    // <div className="hidden md:flex md:w-64 md:flex-col">
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${navbarIsVisible ? 'block' : 'hidden'}`} onClick={handleClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/" onClick={handleClose}> 
                <img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="" />
               </Link> 
           </div>


            <div className="px-4 mt-6">
                <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                        <Link href="/Tshirts" onClick={handleClose} title="" className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group">
                        <img src="/icons/t-shirt.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Tshirts
                        </Link>
                        <Link href="/Pullovers" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/hoodie.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                        Pullovers
                        </Link>

                        <Link href="/Sweatshirts" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/sweater.png"  alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Sweatshirts
                        </Link>
                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        <Link href="/Pants" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/trousers.png"  alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                                  Pants
                        </Link>

                        <Link href="/Shoes" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/sport-shoe.png"  alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Shoes
                        </Link>

                        <Link href="/Jewelry" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/jewelery.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Jewelry
                            {/* <FontAwesomeIcon icon={faRing} className="flex-shrink-0 w-5 h-5 mr-4 text-black" /> */}
                        </Link>
                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        <Link href="/Beauty" onClick={handleClose} className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/makeup.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Beauty 
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NavbarPopup;






