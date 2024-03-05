import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../public/features/userSlice";

export default function verifyRegistry() {
  const router = useRouter();
  const [verifyRegistry, setVerifyRegistry] = useState('');

  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const registryValue = queryParams.get('verifyRegistry');
      setVerifyRegistry(registryValue);
    }
  }, []);

  const dispatch = useDispatch();

  const verifyLinkRequest = (event) => {
    console.log(verifyRegistry);
    event.preventDefault();
    axios.get(verifyRegistry)
      .then((response) => {
        if (response.status === 200) {
          console.log('Verified successfully');
          console.log(response.data); 
          //decode the token
          const jwt = require('jsonwebtoken');

          const decodedToken = jwt.verify(response.data,Buffer.from('MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu', 'base64'));
      
         dispatch(setUsername(decodedToken.firstName));

        //no expiration date defined for the cookie in order to extend it as long as the user is
        //inside the page , but if he leaves the page the cookie will be deleted automatically
        Cookies.set('authToken', response.data, { expires: 1 / 24 });
      
          router.push('/');
        } else {
          console.error('Registration failed');
          // Handle registration failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle other errors
      });
  };

  return (
    <div className="bg-white h-screen  justify-center items-center">
      <h3 className="text-3xl font-semibold mb-8">Registration Successful</h3>
      <button onClick={verifyLinkRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Verify Link
      </button>
    </div>
  );
}
