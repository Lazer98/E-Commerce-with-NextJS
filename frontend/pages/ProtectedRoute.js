import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // This logic should only run on the client side
    const authToken = Cookies.get('authToken');

    if (!authToken) {
      router.replace('/SignIn');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
