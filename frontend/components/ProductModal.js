import React from "react";

const ProductModal = ({ product, closeModal, handleAddToCart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      {/* Background overlay */}
      <div className="relative w-auto max-w-md mx-auto my-6">
        {/* Popup container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col w-full">
          {/* Popup content */}
          <div className="flex flex-col items-center p-5">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{product.description} </p>
          </div>
          {/* Buttons */}
          <div className="flex justify-end p-5 border-t border-solid border-blueGray-200 rounded-b">
            <button className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button className="p-2 m-2 text-gray-600" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
