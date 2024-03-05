import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProduct from '../components/EditProduct';

const PAGE_SIZE = 10;

const AllProducts = ({ show, onClose, setShowModal }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the selected product ID


  let totalPages = Math.ceil(products.length / productsPerPage);
  const noProducts = products.length === 0;
  const [searchForProduct, setSearchForProduct] = useState('');

  useEffect(() => {
    // Fetch total number of products 
    axios.get("http://localhost:8086")
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
          totalPages = Math.ceil(response.data.length / productsPerPage);
        } else {
          console.error('Failed to fetch products');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleProductClick = (productId) => {
    // Set the selected product ID when a product is clicked
    setSelectedProductId(productId);
  };

  const handleSearch = () => {
    const categories = ["Tshirts", "Pullovers", "Sweatshirts", "Shoes", "Pants", "Jewelry", "Beauty"];
    let isCategoryValid = false;
    if (searchForProduct === "") {
      axios.get("http://localhost:8086")
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
            totalPages =Math.ceil(response.data.length / productsPerPage);
          } else {
            console.error('Failed to fetch products');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else{ 
    for (const category of categories) {
      if (searchForProduct === category) {
        isCategoryValid = true;
        //get all products from a certain category
        axios.get(`http://localhost:8086/category/${searchForProduct}`)
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data);
              totalPages=Math.ceil(response.data.length / productsPerPage);
            } else {
              console.error('Failed to fetch products');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
  
        break;
      }
    }
    if (!isCategoryValid) {
      //get all products that contain the searchWord
      axios.get(`http://localhost:8086/searchForProduct/${searchForProduct}`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
            totalPages= Math.ceil(response.data.length / productsPerPage);
          } else {
            console.error('Failed to fetch products');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className=" relative w-full max-w-2xl max-h-screen mx-auto my-6 overflow-y-auto">
        <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h2>All Products</h2>
            

            <div>
              <label className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  name=""
                  id=""
                  className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                  placeholder="Search here"
                  value={searchForProduct}
                  onChange={(e) => setSearchForProduct(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              </div>
            <button onClick={onClose} className="text-blue-500 hover:text-blue-700">
              Close
            </button>
          </div>
          <div className="p-6">
            <table className="w-full">
              {noProducts ? (
                <p>No products to display.</p>
              ) : (
                <React.Fragment>
                <thead> 
                <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Sex</th>
                <th className="p-4 ">Barcode</th>
              </tr>
            </thead>
                <tbody>
                  {currentProducts.map((product) => (
                  <tr key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer hover:bg-gray-100">
                    <td className="p-2 text-left">{product.id}</td>
                    <td className="p-2 text-left">{product.name}</td>
                    <td className="p-2 text-left">{product.price}</td>
                    <td className="p-2 text-left">
                      <img src={product.imageSrc} alt={product.imageAlt} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td className="p-2 text-left">{product.category}</td>
                    <td className="p-2 text-left">{product.sex}</td>
                    <td className="p-2 text-left">{product.quantity}</td>
                    <td className="p-2 text-left">{product.barCode}</td>
                  </tr>
                ))}
              </tbody>
              </React.Fragment>
              )}
            </table>
          </div>
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-blue-500 hover:text-blue-700"
            >
              Prev
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-blue-500 hover:text-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedProductId && (
        <EditProduct
          show={true}
          onClose={() => setSelectedProductId(null)} 
          setShowModal={setShowModal}
          productId={selectedProductId} 
        />
      )}
    </div>
  );
};

export default AllProducts;
