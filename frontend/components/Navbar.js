import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import axios from 'axios'; 
import { clearCart } from "../public/features/cartSlice";
import { setCartItems } from "../public/features/cartItemsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt,faShirt ,faRing,faShoePrints,faSocks} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({isVisible}) => {
  const [searchForProduct, setSearchForProduct] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const categories=["Tshirts","Pullovers","Sweatshirts","Shoes","Pants","Jewelry","Beauty"]
    let isCategoryValid = false;
  if(searchForProduct===""){
    router.push("/");
  }
  for (const category of categories) {
    if (searchForProduct === category) {
      isCategoryValid = true;
      router.push(`/${searchForProduct}`);
      break;
    }
  }
  if(!isCategoryValid){
    router.push(`/searchForProduct/searchForProduct?searchForProduct=${searchForProduct}`);
  }
}

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    
    // <div className="hidden md:flex md:w-64 md:flex-col">
     <div
    className={` top-13 left-0 h-screen md:w-64 overflow-y-auto border-r navbar ${
      isVisible ? 'block' : 'hidden'} {styles.navbar} `}>
        <div className="flex flex-col flex-grow  overflow-y-auto bg-white">
          {/* <div className="flex items-center flex-shrink-0">
              <Link href="/"> 
                <img className="w-auto" width={30} height={40} src="/icons/navTop.png" alt="" />
               </Link> 
               <p>ClariSell</p>
           </div> */}

       
            <div className="px-4 mt-6">
                <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                        <Link href="/Tshirts" title="" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/t-shirt.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Tshirts
                        </Link>
                        <Link href="/Pullovers" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/hoodie.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                        Pullovers
                        </Link>

                        <Link href="/Sweatshirts" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/sweater.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Sweatshirts
                        </Link>
                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        <Link href="/Pants"className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/trousers.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                                  Pants
                        </Link>

                        <Link href="/Shoes" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/sport-shoe.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Shoes
                        </Link>

                        <Link href="/Jewelry" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                        <img src="/icons/jewelery.png" alt="Tshirt Icon" width={20} height={20} className="flex-shrink-0 w-5 h-5 mr-4 text-black" />
                            Jewelry
                            {/* <FontAwesomeIcon icon={faRing} className="flex-shrink-0 w-5 h-5 mr-4 text-black" /> */}
                        </Link>
                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        <Link href="/Beauty"className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
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

export default Navbar;






