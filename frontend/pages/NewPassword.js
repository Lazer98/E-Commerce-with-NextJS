import React, {useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import axios from 'axios'; 
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';


const NewPassword = () => {
  const dispatch = useDispatch();
  const verifyLink = useSelector((state) => state.verifyToken.verifyToken);
  const router = useRouter();

  useEffect(() => {
    // This logic should only run on the client side
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      router.replace('/SignIn');
    }
  }, [router]);
  const [formData, setFormData] = useState({
    email: '',
    newPassword:'',
    matchingPassword: ''
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isMatchingPasswordValid, setIsMatchingPasswordValid] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));

    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  const handleNewPasswordChange = (event) => {
    const { value } = event.target;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setIsNewPasswordValid(passwordRegex.test(value));

    setFormData((prevData) => ({
      ...prevData,
      newPassword: value,
    }));
  };

  
  const handleMatchingPasswordChange = (event) => {
    const { value } = event.target;
    setIsMatchingPasswordValid(value === formData.newPassword);

    setFormData((prevData) => ({
      ...prevData,
      matchingPassword: value,
    }));
  };

  const handleSaveResetPassword = (event) => {
    event.preventDefault();

    if (isEmailValid && isNewPasswordValid && isMatchingPasswordValid) {
      axios
        .post(verifyLink, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Password reset successful!');
            console.log(response.data);

            // const jwt = require('jsonwebtoken');
            // const decodedToken = jwt.verify(
            //   response.data,
            //   Buffer.from(
            //     'MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu',
            //     'base64'
            //   )
            // );

            // dispatch(setUsername(decodedToken.firstName));

            // Cookies.set('authToken', response.data, { expires: 1 / 24 });

            router.push('/SignIn');
          } else {
            console.error('Login failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('Invalid email or password. Please check your inputs.');
    }
  };

  return (
    <div className="w-full max-w-xs">
  <form onSubmit={handleSaveResetPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input  name="email" value={formData.email}
        onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email"
         />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
       New Password
      </label>
      <input name="newPassword" value={formData.newPassword}
        onChange={handleNewPasswordChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
            />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        New Password again
      </label>
      <input  name="matchingPassword" value={formData.matchingPassword}
        onChange={handleMatchingPasswordChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
            />
    </div>
    <div className="flex items-center justify-between">
    <button
            className={`${
              isEmailValid && isNewPasswordValid && isMatchingPasswordValid? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={!isEmailValid || !isNewPasswordValid || !isMatchingPasswordValid}
          >        Change your password
      </button>
    </div>
  </form>
</div>
  );
};

export default NewPassword;
