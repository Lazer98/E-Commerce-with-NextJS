import React, {useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import axios from 'axios'; 
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Modal from 'react-modal'; // Import the Modal component

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  headline: {
    color: 'red', // Set the text color of the headline to red
  },
};

Modal.setAppElement('#__next'); // Set the app element for accessibility



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
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

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
          setErrorText('Login failed. Please check your credentials.'); 
          setShowError(true);
        });
    } else {
      console.log('Invalid email or password. Please check your inputs.');
    }
  };

  const handleCloseErrorModal = () => {
    setShowError(false);
  };

  return (
    <div className="w-full max-w-xs">
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

    <Modal
          isOpen={showError}
          onRequestClose={handleCloseErrorModal}
          style={customStyles}
          contentLabel="Error Modal"
        >
          <h2 style={customStyles.headline}>Error</h2>
          <p>{errorText}</p>
          <button className="bg-blue-500 hover:bg-blue-700text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={handleCloseErrorModal}>Close</button>
        </Modal>
</div>
  );
};

export default Login;
