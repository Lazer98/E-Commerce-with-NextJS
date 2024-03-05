import Link from 'next/link';
import React, { useState } from 'react';
import ShoppingCartIcon from './ShoppingCartIcon';
import ProfilIcon  from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import { clearCart } from "../public/features/cartSlice";
import { setCartItems } from "../public/features/cartItemsSlice";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { setNavbarIsVisible } from '../public/features/navbarSlice'; 
import {  selectNavbarIsVisible } from '../public/features/navbarSlice'; 


const NavbarHorizontal = () => {
  const [searchForProduct, setSearchForProduct] = useState('');
  const router = useRouter();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navbarIsVisible = useSelector(selectNavbarIsVisible);


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

  const handleBurger = () => {
    console.log(navbarIsVisible);
    const opposite =!navbarIsVisible;
    dispatch(setNavbarIsVisible(opposite));
  };

  const handleLogout = (e) => {
    dispatch(setUsername(""));
    dispatch(clearCart());
    dispatch(setCartItems(0));
    
    axios.delete(`http://localhost:8086/loginToken/${ Cookies.get('authToken')}`,
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Deleted successfully');
          console.log(response.data);
          localStorage.removeItem('token');
        } else {
          console.error('Delete failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      Cookies.remove('authToken');
  };

  
  return (
    <nav className="relative flex flex-wrap items-center justify-between py-2 bg-indigo-500 mb-3">
      <div className="container mx-auto flex items-center justify-between">
      <button
          className="block lg:hidden focus:outline-none"
          onClick={handleBurger}
        >
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="pl-4 sm:pl-8 md:pl-12"> {/* Adjust the padding for small and medium screens */}

        <div className="lg:absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <div className="pl-1">
            <input
              type="search"
              name=""
              id=""
              className="block w-full py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              placeholder="Search here"
              value={searchForProduct}
              onChange={(e) => setSearchForProduct(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>


        {/* User Icons */}
        <div className="lg:flex flex-grow items-center flex" id="example-navbar-danger">
          <div className="container mx-auto flex items-center justify-end">
            {username && (
              <div className="pr-4 flex items-center">
                <p className="px-2">Hello {username}!</p>
                <Link href="/">
                  <Icon
                    path={mdiLogout}
                    title="User Profile"
                    size={1}
                    horizontal
                    vertical
                    color="blue"
                    onClick={handleLogout}
                  />
                </Link>
              </div>
            )}
            {!username && (
              <div className="mr-2">
                <Link href="/SignIn">
                  <LockOpenIcon style={{ fontSize: '2.0rem' }} />
                </Link>
              </div>
            )}
            {username && (
              <div className="mr-2">
                <Link href="/MyProfil">
                  <ProfilIcon style={{ fontSize: '2.0rem' }} />
                </Link>
              </div>
            )}
            <Link href="/Cart">
              <ShoppingCartIcon style={{ fontSize: '2.0rem' }} itemCount={cartItems} />
            </Link>
          </div>
        </div>
      </div>


    </nav>
  );
};

export default NavbarHorizontal;