import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../public/features/cartSlice";
import { setCartItems } from "../public/features/cartItemsSlice";
import { addToCart,removeFromCart } from "../public/features/cartSlice";

export default function Cart() {
    const dispatch = useDispatch();
    const products = useSelector(selectCartItems);
    const cartItems = useSelector((state) => state.cartItems.cartItems);
    const router = useRouter();
    const username = useSelector((state) => state.user.username);

    const totalPrice = () => {
        return products.reduce((sum, product) => {
          return sum + product.price * product.quantity;
        }, 0);
      };

    const handleIncrement = (product) => {
        dispatch(setCartItems(cartItems + 1));
        dispatch(addToCart(product));
      };
      const handleDecrement = (product) => {
        dispatch(setCartItems(cartItems - 1));
        dispatch(removeFromCart(product)); 
      };
      const proceedToPayment = () => {
        console.log(products);
        if(username ==null){
            router.push("/SignIn");
        }
        else{
            router.push("/Payment1Page");
        }
      };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products in your Cart:</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {(products.length === 0) && (<p className="mb-4">Your cart is empty.</p>)}
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleDecrement(product)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncrement(product)}>+</button>
              </div>
            </a>
          ))}
        </div>
        <p className="my-1 text-lg font-medium text-gray-900">In total: ${totalPrice()}</p>
        <button className="mt-4 flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200  bg-indigo-600 rounded-lg group" onClick={proceedToPayment}>Proceed to payment</button>
      </div>
    </div>
  );
}
