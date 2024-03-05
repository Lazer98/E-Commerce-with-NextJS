import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product'

export default function Jewelry() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to your backend API
    axios.get('http://localhost:8086/category/Jewelry')
      .then((response) => {
        // Set the products state with the data received from the API
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product  key={product.id} product={product} />

          ))}
        </div>
      </div>
    </div>
  );
}
