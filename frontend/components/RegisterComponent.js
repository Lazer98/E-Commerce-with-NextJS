import React, {useEffect, useState } from 'react';
import axios from 'axios'; 
import Modal from '../components/Modal'
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../public/features/userSlice";
import ErrorModal from '../components/ErrorModal'
import { useRouter } from 'next/router';

const RegisterComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [verifyLink, setVerifyLink] = useState("http://localhost:8086/verifyRegistration?token=a9bf66a5-d4e3-430c-82e5-ffbadb2229f7");
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    password: '',
    matchingPassword: '',
  });

  useEffect(() => {
    // Example: Set the username when the component mounts
    dispatch(setUsername(""));
  }, [dispatch]);


  const closeModal = () => {
    setShowModal(false);
  };
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };
  

  
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isMatchingPasswordValid, setIsMatchingPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone:'',
      password: '',
      matchingPassword: '',
    });

    setIsFirstNameValid(false);
    setIsLastNameValid(false);
    setIsEmailValid(false);
    setIsPhoneValid(false);
    setIsPasswordValid(false);
    setIsMatchingPasswordValid(false);

    setFirstNameError('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation for each input
    switch (name) {
      case 'firstName':
        setIsFirstNameValid(value.length >= 2);
        setFirstNameError(value.length >= 2 ? '' : 'Name must be at least 2 characters.');
        break;
      case 'lastName':
        setIsLastNameValid(value.length >= 2);
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
        break;
        case 'phone':
            const phoneRegex = /^[0-9]{10}$/;
            setIsPhoneValid(phoneRegex.test(value));
            break;
      case 'password':
        // Password validation (at least 8 characters, one uppercase letter, one number)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        setIsPasswordValid(passwordRegex.test(value));
        break;
      case 'matchingPassword':
        setIsMatchingPasswordValid(value === formData.password);
        break;
      default:
        break;
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
  
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isPasswordValid && isMatchingPasswordValid) {
      axios
        .post('http://localhost:8086/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setShowModal(true);
            resetForm();
            //router.push('/');
            console.log('Registration successful');
            setVerifyLink(response.data);
            Cookies.set('authToken', response.data, { expires: 1 / 24 });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.log(error.response.data);
            setShowErrorModal(true);
            setErrorMessage(error.response.data); 

          } else if (error.response && error.response.data) {
            setErrorMessage(error.response.data.message); 
          } else {
            setErrorMessage('An unexpected error occurred.');
          }
          // Handle other errors or show error message
        });
    } else {
      console.log('Invalid input. Please check your inputs.');
    }
  };
  


  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">
            First name
          </label>
          <input  name="firstName" value={formData.firstName}
          onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="First name"
          />
          
        </div>
        <div className="mb-4">
          <label  className="block text-gray-700 text-sm font-bold mb-2">
            Last name
          </label>
          <input  name="lastName" value={formData.lastName}
          onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Last name"
        />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Email
          </label>
          <input  name="email" value={formData.email}
          onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Phone
          </label>
          <input  name="phone" value={formData.phone}
          onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Phone number"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Password
          </label>
          <input  name="password" value={formData.password}
          onChange={handleInputChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
              />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            matching password
          </label>
          <input  name="matchingPassword" value={formData.matchingPassword}
          onChange={handleInputChange}  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
        />
          <p className="text-red-500 text-xs italic">Please confirm the password.</p>
        </div>
        <button   type="submit"
            className={`${
              isFirstNameValid &&
              isLastNameValid &&
              isEmailValid &&
              isPhoneValid &&
              isPasswordValid &&
              isMatchingPasswordValid
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-gray-400'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >Register</button>
  </form>
<Modal  show={showModal} onClose={closeModal} />
<ErrorModal errorMessage={errorMessage} show={showErrorModal} onClose={closeErrorModal} setShowModal={setShowErrorModal}/>

  </div>
  );
};

export default RegisterComponent;
