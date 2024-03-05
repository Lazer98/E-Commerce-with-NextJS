import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../public/features/cartItemsSlice";
import { addToCart } from "../public/features/cartSlice";
import { selectCartItems } from "../public/features/cartSlice";
import React, { useEffect, useState } from 'react';
import ProductModal from "./ProductModal";


export default function Product({product}) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems.cartItems);
    const productsInTheCart = useSelector(selectCartItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkIfProductExists = () => {
      const foundProduct = productsInTheCart.find(item => item.id === product.id);
  
      if (foundProduct) {
        // If the product exists in the cart, increase its quantity inside the slice
        dispatch(addToCart(product));
      } else {
        const product1 ={id:'',name:'',price:'',imageSrc:'',imageAlt:'',category:'',sex:'',barCode:'',description:'',quantity:1};
        product1.id=product.id;
        product1.name=product.name;
        product1.price=product.price;
        product1.imageSrc=product.imageSrc;
        product1.imageAlt=product.imageAlt;
        product1.category=product.category;
        product1.barCode=product.barCode;
        product1.sex=product.sex;
        product1.description=product.description;
        console.log(product1);
        dispatch(addToCart(product1));
      }
    };

    const handleAddToCart = () => {
        dispatch(setCartItems(cartItems + 1));
        checkIfProductExists();
      };
      const openModal = () => {
        setIsModalOpen(true);
      };
    
      // Function to close the modal
      const closeModal = () => {
        setIsModalOpen(false);
      };

  return (
            <a  href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  onClick={openModal}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
              <button className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                    {isModalOpen && (
        <ProductModal product={product} closeModal={closeModal} handleAddToCart={handleAddToCart}/>
      )}
            </a>
            

  );
}
