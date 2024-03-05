// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
//import Providers from 'next-auth/providers';
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000/api/auth/callback/facebook',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ['profile', 'email'],
    }),  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async profile(profile, tokens) {
      console.log(profile.email);
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        // Add any other user details you want to include
      };
    }
  },
  debug: true, // Enable debug mode
});
