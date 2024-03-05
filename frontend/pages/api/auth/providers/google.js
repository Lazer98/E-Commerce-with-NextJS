// pages/api/auth/providers/google.js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { useDispatch } from "react-redux";
import axios from 'axios'; 

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.email = user.email;
                token.password = "GooglePassword12";
            }
            return token;
        },
    },

});
// async jwt(token, user) {
//     if (user) {
//         token.email = user.email;
//         token.password = "GooglePassword12";
//     }
//     //check if user exists
//     const userExists = false;
//     const dispatch = useDispatch();

//     axios.get(`http://localhost:8086/email/${user.email}`)
//         .then((response) => {
//             userExists = response.data;
//         })
//         .catch((error) => {
//             console.error('Error fetching data:', error);
//         });
//     //register if he doesn't exist 
//     if (!userExists) {
//         const nameParts = user.name.split(' ');
//         const formDataRegister = {
//             firstName: nameParts[0],
//             lastName: nameParts[nameParts.length - 1],
//             password: "GooglePassword12",
//             email: user.email,
//         };
//         axios.post('http://localhost:8086/register', formDataRegister, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then((response) => {
//                 if (response.status === 200) {
//                     console.log('Registration successful');
//                     //verify the registration
//                     axios.get(response.data)
//                         .then((response) => {
//                             if (response.status === 200) {
//                                 console.log('Verified successfully');
//                                 dispatch(setUsername(response.data.user.firstName));
//                                 localStorage.setItem('token', response.data.token);
//                             } else {
//                                 console.error('Verification failed');
//                             }
//                         })
//                         .catch((error) => {
//                             console.error('Error:', error);
//                         });
//                 } else {
//                     console.error('Registration failed');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     }

//     //login if he exists
//     else {
//         const formDataLogin = {
//             password: "GooglePassword12",
//             email: user.email,
//         };
//         axios.post('http://localhost:8086/login', formDataLogin, {
//             headers: {
//               'Content-Type': 'application/json', 
//             },
//           })
//             .then((response) => {
//               if (response.status === 200) {
//                 console.log(response.data);
//                 dispatch(setUsername(response.data.user.firstName));
//                 localStorage.setItem('token', response.data.token);
//                 //router.push("/");
//               } else {
//                 console.error('Login failed');
//               }
//             })
//             .catch((error) => {
//               console.error('Error:', error);
//             }
//          )
//     }
//     return token;
// },
// },
// pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout',
//     error: '/auth/error',
//     verifyRequest: '/auth/verify-request',
//     newUser: null,
//   },
//   session: {
//     jwt: true,
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // 24 hours
//     // Add the following line to increase the cookie size limit
//     cookieOptions: {
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
//       path: '/',
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//     },
//   },