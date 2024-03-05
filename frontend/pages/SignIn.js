
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Login from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import { setUsername } from "../public/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';

export default function SignIn() {
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   // Check if the user has been redirected from Google login
  //   if (router.pathname === '/google-callback') {
  //     handleGoogleLogin();
  //   }
  // }, [router.pathname]);

  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await signIn('google');
  //     console.log('Sign in response:', response);

  //     if (response?.ok) {
  //       // Retrieve the session information
  //       const session = await getSession();
  //       const user = session?.user;

  //       if (user) {
  //         console.log('Logged in user:', user);

  //         // Extract 'given_name' from 'OAuthProfile'
  //         const givenName = user?.OAuthProfile?.given_name;

  //         // Log the 'given_name' or use it as needed
  //         console.log('Given Name:', givenName);

  //         // Dispatch the username to Redux
  //         dispatch(setUsername(givenName || user.name));
  //       }
  //     } else {
  //       console.error('Google login failed:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error during Google login:', error);
  //   }
  // };
  
  // const { data, status } = useSession();
  // if (status === 'loading') return <h1> loading... please wait</h1>;
  // if (status === 'authenticated') {
  //   return (
  //     <div>
  //       <h1> hi {data.user.name}</h1>
  //       <img src={data.user.image} alt={data.user.name + ' photo'} />
  //       <button onClick={signOut}>sign out</button>
  //     </div>
  //   );
  // }
  return (
    <div className="inset-x-0 max-w-max mx-auto ">
      {/* {session ? (
        <div>
          <h1> hi {session.user.name}</h1>
          <img src={session.user.image} alt={session.user.name + ' photo'} />
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : ( */}
        <div className="inset-x-0 max-w-max mx-auto ">
            {showLogin ? <Login /> : <RegisterComponent />}
          <button
            className="mb-3 text-sm text-indigo-600 hover:underline cursor-pointer"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
          {/* <button
            className="mb-3 ml-3 text-sm text-indigo-600 hover:underline cursor-pointer"
            onClick={() => signIn('google')}
          >
            {'Switch to Google Login'}
          </button> */}
        </div>
      {/* )} */}
    </div>
  );
}