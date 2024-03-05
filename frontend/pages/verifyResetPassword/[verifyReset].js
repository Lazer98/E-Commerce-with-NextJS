import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

export default function verifyReset() {
  const router = useRouter();
  const [verifyReset, setVerifyReset] = useState('');
  const [savePasswordURL, setSavePasswordURL] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordDuplicateValid, setIsPasswordDuplicateValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [formData, setFormData] = useState({
    email:'',
    newPassword: '',
    newPasswordDuplicate: ''
  });
  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const resetValue = queryParams.get('verifyReset');
      setVerifyReset(resetValue);
    }
  }, []);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setIsPasswordValid(passwordRegex.test(value));
    //setIsPasswordValid((value!==''));

    setFormData((prevData) => ({
      ...prevData,
      newPassword: value,
    }));
  };
  const handlePasswordDuplicateChange = (event) => {
    const { value } = event.target;

    setIsPasswordDuplicateValid((value === formData.newPassword ));

    setFormData((prevData) => ({
      ...prevData,
      newPasswordDuplicate: value,
    }));
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;

    // Email validation
    setIsEmailValid((value!==''));

    setFormData((prevData) => ({
      ...prevData,
      email: value,
    }));
  };




  const dispatch = useDispatch();

  const verifyLinkRequest = (event) => {
    setShowForm(true);
 
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
  
    // Verify the reset token
    axios.get(verifyReset)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data); // Verify if this is the correct URL
  
          // Save the new password if the token is valid
          axios.post(response.data, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.status === 200) {
                console.log('Password changed successfully!');
                console.log(response.data);
  
                router.push('/SignIn');
              } else {
                console.error('Password change failed');
                // Handle password change failure
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              // Handle other errors
            });
        } else {
          console.error('Reset password failed');
          // Handle reset password failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle other errors
      });
  };
  


  return (
    <div className="bg-white h-screen flex flex-col  items-center">
      <h3 className="text-3xl font-semibold ml-10 mb-8">New Password</h3>
      {(showForm === false) ?
        <button onClick={verifyLinkRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Verify Link
        </button>

    :
      <form onSubmit={handleNewPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input  name="email" value={formData.email}
            onChange={handleEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email"
            />
        </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          Password
        </label>
        <input  name="newPassword" value={formData.newPassword}
          onChange={handlePasswordChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
              />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
          Enter Password again
        </label>
        <input  name="newPassword" value={formData.newPasswordDuplicate}
          onChange={handlePasswordDuplicateChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
              />
      </div>
      <div className="flex items-center justify-between">
      <button
              className={`${
                isPasswordDuplicateValid && isPasswordValid && isEmailValid? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={!isPasswordValid || !isPasswordDuplicateValid || !isEmailValid}
            >        Change Password
        </button>
      </div>
    </form>
      }
    </div>
  );
}
