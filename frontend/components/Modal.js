import React from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";

const Modal = ({ show, onClose }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    // const verifyLinkRequest = (event) => {
    //     event.preventDefault();
    //     axios.get(verifyLink)
    //       .then((response) => {
    //         if (response.status === 200) {
    //           console.log('Verified successfully');
    //           console.log(response.data); 
    //           //decode the token
    //           const jwt = require('jsonwebtoken');

    //           const decodedToken = jwt.verify(response.data,Buffer.from('MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu', 'base64'));
          
    //          dispatch(setUsername(decodedToken.firstName));

    //         //no expiration date defined for the cookie in order to extend it as long as the user is
    //         //inside the page , but if he leaves the page the cookie will be deleted automatically
    //         Cookies.set('authToken', response.data, { expires: 1 / 24 });
          
    
    //           setShowModal(false);
    //           router.push('/');
    //         } else {
    //           console.error('Registration failed');
    //           // Handle registration failure
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //         // Handle other errors
    //       });
    //   };

    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-md mx-auto my-6">
          <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Registration Successful</h3>
              {/* <div className="flex items-center justify-between">
        <button onClick={verifyLinkRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Verify Link
        </button>
      </div> */}
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <p>Your registration was successful.Please click on the verification link you recieved per email.</p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Modal;
