import React, {useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import axios from 'axios'; 
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';


("next-auth/client");

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;

    // Email validation
    setIsEmailValid((value!==''));

    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    setIsPasswordValid((value!==''));

    setFormData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      axios
        .post('http://localhost:8086/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Login successful');
            console.log(response.data);

            const jwt = require('jsonwebtoken');
            const decodedToken = jwt.verify(
              response.data,
              Buffer.from(
                'MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu',
                'base64'
              )
            );

            dispatch(setUsername(decodedToken.firstName));
            Cookies.set('authToken', response.data, { expires: 1 / 24 });
            router.push('/');
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
    <div  className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            Password
          </label>
          <input  name="password" value={formData.password}
            onChange={handlePasswordChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
                />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
        <button
                className={`${
                  isEmailValid && isPasswordValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
                disabled={!isEmailValid || !isPasswordValid}
              >        Sign In
          </button>
          <Link href="/ResetPassword"> 
          <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </p>
          </Link>
        </div>
      </form>
</div>
  );
};

export default Login;
