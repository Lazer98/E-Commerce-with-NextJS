import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { selectCartItems } from "../public/features/cartSlice";
import { selectTotalSum } from "../public/features/cartSlice";
import { clearCart } from "../public/features/cartSlice";
import { setCartItems } from "../public/features/cartItemsSlice";
import ProtectedRoute from './ProtectedRoute';
import Cookies from 'js-cookie';

export default function PayPal() {
    const products = useSelector(selectCartItems);
    const totalSum = useSelector(selectTotalSum);
    const dispatch = useDispatch();
    const [authToken,setAuthToken]= useState(false);
    const [decodedToken,setDecodedToken]= useState(false);
    const [response,setResponse]= useState("");

    useEffect(() => {
      const token = Cookies.get('authToken');
    
      if (token) {
        setAuthToken(token);
    
        try {
          const jwt = require('jsonwebtoken');
          const decodedTokenFlag = jwt.verify(
            token,
            Buffer.from(
              'MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu',
              'base64'
            )
          );
          setDecodedToken(decodedTokenFlag);
          console.log(decodedToken);
          console.log(authToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }, []);

    const handlePaymentApproval = (data, actions) => {
        handleOrder();
        
      };
      const totalPrice = () => {
        return products.reduce((sum, product) => {
          return sum + product.price * product.quantity;
        }, 0);
      };
      const handleOrder = (event) => {
        const orderObject={
          "products":products,
          "created": new Date() ,
          "customer_id": decodedToken.id ,
          "price": totalPrice()
      
        }
        console.log(orderObject);
          axios
            .post('http://localhost:8088/order', orderObject, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((response) => {
              setResponse(response.data);
              if (response.status === 200) {
                dispatch(clearCart());
                dispatch(setCartItems(0));
               
              } else {
                console.error('Order failed');
                setResponse(response.data);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              // Handle the error in a way that makes sense for your application
              if (error.response && error.response.status === 400) {
                console.log('Detailed error message:', error.response.data);
                setResponse(error.response.data);
              } else {
                console.error('An unexpected error occurred:', error.message);
    }
            });
      };
    
      
 
  return (
    <ProtectedRoute>
      <div className="my-9 mx-9 "> 
      {!response ? (
        <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}>
        <PayPalButtons 
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalSum,
                currency_code: 'USD',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: totalSum.toFixed(2),
                  },
                },
              },
              items: products.map(item => ({
                name: item.name,
                quantity: item.quantity,
                unit_amount: {
                  value: item.price.toFixed(2),
                  currency_code: 'USD',
                },
              })),
            },
          ],
        });
      }}
      onApprove={handlePaymentApproval}
    />
    
        </PayPalScriptProvider>
      ) : (
        <p>{response}</p>
      )}
   
    </div>
    </ProtectedRoute>
  );
};
