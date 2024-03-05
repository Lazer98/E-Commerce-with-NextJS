import React, { useState } from 'react';
import axios from 'axios';
import ResetPasswordModal from '../components/ResetPasswordModal'

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verifyLink, setVerifyLink] = useState("http://localhost:8086/verifyRegistration?token=a9bf66a5-d4e3-430c-82e5-ffbadb2229f7");
 
  const handleInputChange = (event) => {
    const { value } = event.target;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);

    setEmail(value);
    setIsEmailValid(isValidEmail);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleReset = (event) => {
    event.preventDefault();
    console.log(email);
    axios
      .post('http://localhost:8086/resetPassword/first/'+ `${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Request successful');
          console.log(response.data);
          setIsSent(true);
          setVerifyLink(response.data);
          setShowModal(true);
        } else {
          console.error('Request failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="w-full max-w-xs">
      {!isSent && (
        <form onSubmit={handleReset} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Enter your Email
            </label>
            <input
              name="email"
              value={email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Email"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`${
                isEmailValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={!isEmailValid}
            >
              Send me an email
            </button>
          </div>
        </form>
      )}
      {isSent && (
        <div>
          <p className="flex items-center">Email sent!</p>
          <ResetPasswordModal verifyLink={verifyLink} show={showModal} onClose={closeModal} setShowModal={setShowModal}/>

        </div>
      )}
    </div>
  );
}
