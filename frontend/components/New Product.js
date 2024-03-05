import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { storage } from '../config/firebase';

const NewProduct = ({ show, onClose, setShowModal }) => {
    //const dispatch = useDispatch();
    const [productId,setProductId]=useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        imageSrc: '',
        imageAlt:'',
        sex: '',
        category: '',
        barCode: '',
    });
    const [storage, setStorage] = useState({
        productId: '',
        quantity: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStringValid, setIsStringValid] = useState(false);
    const [isIntValid, setIsIntValid] = useState(false);
    const [isQuantityValid, setIsQuantityValid] = useState(false);
  
    const categories = ["Tshirts", "Pullovers", "Sweatshirts", "Shoes", "Pants", "Jewelry", "Beauty"];
    const sexes =["male","female","unisex"];
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        // If the value is a category, update the category directly
        if (categories.includes(value)) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        } else {
          // Otherwise, handle regular input changes
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
        if (name === 'name' || name === 'imageSrc' || name === 'imageAlt' || name === 'sex' || name === 'barCode') {
            console.log('String Validation:', value.length >= 2);
            setIsStringValid(value.length >= 2);
          } else if (name === 'price') {
            const priceRegex = /^[0-9]+(\.[0-9]+)?$/;
            console.log('Price Validation:', priceRegex.test(value));
            setIsIntValid(priceRegex.test(value));
          }

      };
      const handleStorageQuantity = (event) => {
        const { name, value } = event.target;
    
        // If the value is a category, update the category directly
           setStorage((prevData) => ({
            ...prevData,
            quantity: value,
          }));
          const regex = /^[0-9]+$/; 
          setIsQuantityValid(regex.test(value));
          console.log(isQuantityValid);
          
      };

      const handleStorageProductId = (productId) => {
        // If the value is a category, update the category directly
        setStorage((prevData) => ({
          ...prevData,
          productId: productId,
        }));
      };
    
    
     
    
//   useEffect(() => {
//     // Fetch total number of products 
   
//   }, []);
  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     image: file,
  //   }));

  //   if (file) {
  //     try {
  //       const storageRef = storage.ref();
  //       const imageRef = storageRef.child(`images/${file.name}`);
  //       await imageRef.put(file);
  //       const downloadURL = await imageRef.getDownloadURL();
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         imageUrl: downloadURL,
  //       }));
  //     } catch (error) {
  //       console.error('Error uploading image to Firebase:', error);
  //     }
  //   }
  // };
 
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      imageSrc: '',
      imageAlt:'',
      sex: '',
      category: '',
      barCode: '',
    });

    setIsStringValid(false);
    setIsIntValid(false);
  

  };


  const handleNewProduct = (event) => {
    event.preventDefault();

    if (isStringValid && isIntValid) {
      axios
        .post('http://localhost:8086', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const successMessage = response.data; // Assuming the response is a string like "Successfully!15"
            const idMatch = successMessage.match(/Successfully!(\d+)/);
      
            if (idMatch) {
                setProductId(idMatch[1]);
                handleStorageProductId(idMatch[1]);
              console.log('Product ID:', idMatch[1]);
            }else {
              console.error('Failed to extract product ID from response.');
            }

            console.log('Post successful');
            resetForm();
           // onClose();
          } else {
            console.error('Post failed');
            // Handle post failure
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle other errors
        });
    } else {
      console.log('Invalid input. Please check your inputs.');
    }
  };

  const handleNewStorage = (event) => {
    event.preventDefault();

    if (isQuantityValid) {
      axios
        .post('http://localhost:8087/storage', storage, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data); // Assuming the response is a string like "Successfully!15"
            

            console.log('Post successful');
            onClose();
          } else {
            console.error('Post failed');
            // Handle post failure
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle other errors
        });
    } else {
      console.log('Invalid input. Please check your inputs.');
    }
  };

  


  

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className=" relative w-full max-w-2xl max-h-screen mx-auto my-6 overflow-y-auto">
        <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h2>New Product</h2>
            <button onClick={onClose} className="text-blue-500 hover:text-blue-700">
              Close
            </button>
          </div>
            <form onSubmit={handleNewProduct} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label  className="block text-gray-700 text-sm font-bold mb-2">
                Name
                </label>
                <input  name="name" value={formData.name}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name"
                />
                
            </div>
            <div className="mb-4">
                <label  className="block text-gray-700 text-sm font-bold mb-2">
                Price
                </label>
                <input  name="price" value={formData.price}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Price"
            />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                Image source
                </label>
                <input  name="imageSrc" value={formData.imageSrc}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Image source"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                Image Alt
                </label>
                <input  name="imageAlt" value={formData.imageAlt}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Image alt"
                />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setIsDropdownOpen(false)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              
              </div>

            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
               Sex
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setIsDropdownOpen(false)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                   <option value="">Select a Sex</option>
                  {sexes.map((sex) => (
                    <option key={sex} value={sex}>
                      {sex}
                    </option>
                  ))}
                </select>
                {/* <input  name="sex" value={formData.sex}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Sex"
            /> */}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                Barcode
                </label>
                <input  name="barCode" value={formData.barCode}
                onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Barcode"
                    />
            </div>
            <button   type="submit"
                className={`${
                    isStringValid &&
                    isIntValid 
                    ? 'bg-blue-500 hover:bg-blue-700'
                    : 'bg-gray-400'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >Add</button>
        </form>
        {/* { productId && ( 
            <div>
                <h2>Set the storage quantity:</h2>
                    <form onSubmit={handleNewStorage} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Quantity
                            </label>
                            <input  name="quantity" value={storage.quantity}
                            onChange={handleStorageQuantity} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Quantity"
                                />
                        </div>
                        <button   type="submit"
                            className={`${
                                isQuantityValid
                                ? 'bg-blue-500 hover:bg-blue-700'
                                : 'bg-gray-400'
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            >Add</button>
            </form>
            
             </div>
                        

        )} */}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
