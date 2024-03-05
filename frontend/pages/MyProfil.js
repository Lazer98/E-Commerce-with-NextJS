import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import Cookies from 'js-cookie';
import AllProducts from '../components/AllProducts';
import NewProduct from '../components/New Product';
import UserModal from '../components/UserModal'


export default function MyProfil() {
    const dispatch = useDispatch();
    const [authToken,setAuthToken]= useState(false);
    const [decodedToken,setDecodedToken]= useState(false);
    const [orders,setOrders]= useState([]);
    const [personalData, setPersonalData] = useState({});
    const [change,setChange] =useState(false);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [users, setUsers] = useState([]);
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const visibleUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    const [showModal, setShowModal] = useState(false);
    const [showModalNewProduct, setShowModalNewProduct] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('authToken');
      console.log(token);
      if (token) {
        setAuthToken(token);
    
        const jwt = require('jsonwebtoken');
        const decodedTokenFlag = jwt.verify(
          token,
          Buffer.from(
            'MyVerySecretKeyThatNooneIsAllowedToSeeOrHearAbout123456789123456789123456789qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqscbhevbjhdfbvjevbjwbrebfhecbasndbkjwehcweubckhvbwebqxxknnknjhbwdaknhuhuwegfuwefwu',
            'base64'
          )
        );
        setDecodedToken(decodedTokenFlag);
      } else {
        router.push('/SignIn');
      }
    }, []); // Run once when the component mounts

      useEffect(() => {
              const fetchData = async () => {
                try {
                  if (decodedToken) {
                    const id = decodedToken.id;
            // Use Promise.all to wait for both requests to complete
            if(decodedToken.role === 'ADMIN'){
              axios
                  .get(`http://localhost:8086/allUsers/${id}`, {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                       setUsers(response.data);
                       console.log(response.data);
                    } else {
                      console.error('Users request failed');
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
            }
            else{
            const [ordersResponse, userDataResponse, addressDataResponse] = await Promise.all([
              axios.get(`http://localhost:8088/order/user/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              }),
              axios.get(`http://localhost:8086/user/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              }),
              axios.get(`http://localhost:8086/userAdress/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              }),
            ]);
  
            if (ordersResponse.status === 200) {
              setOrders(ordersResponse.data);
            } else {
              console.error('Orders request failed');
            }
  
            if (userDataResponse.status === 200) {
              const { firstName, lastName, email } = userDataResponse.data;
              setPersonalData((prevData) => ({
                ...prevData,
                firstName,
                lastName,
                email,
              }));
              console.log(userDataResponse.data);
            } else {
              console.error('User data request failed');
            }
  
            if (addressDataResponse.status === 200) {
              const { city, street, streetNumber, entrance, zipCode } = addressDataResponse.data;
              setPersonalData((prevData) => ({
                ...prevData,
                city,
                street,
                streetNumber,
                entrance,
                zipCode,
              }));
             
            } else {
              console.error('Address data request failed');
            }
          }
          } else {
              console.log("wait for it");
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

      fetchData();
    }, [decodedToken]); // Run when decodedToken changes

    useEffect(() => {
      const fetchCitySuggestions = async () => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${personalData.city}&key=7dca984174754b7bb6ec3857c9f1d3da&limit=5`
          );
  
          if (response.data.results) {
            const suggestions = response.data.results.map((result) => result.formatted);
            setCitySuggestions(suggestions);
          }
        } catch (error) {
          console.error('Error fetching city suggestions:', error);
        }
      };
  
      // Fetch city suggestions only if the city has at least 3 characters
      if(personalData.city !== undefined){
      if (personalData.city.length >= 3) {
        fetchCitySuggestions();
      } else {
        setCitySuggestions([]);
      }
    }else {
      setCitySuggestions([]);
    }
    }, [personalData.city]);
  
    const handleInputChange = (event) => {
     
      const { name, value } = event.target;
      setPersonalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    const closeModal = () => {
      setShowModal(false);
    };
    const closeUserModal = () => {
      setShowUserModal(false);
    };
    const closeModalNewProduct = () => {
      setShowModalNewProduct(false);
    };
    

    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

      const updatePersonalData=()=> {
        axios
        .put(`http://localhost:8086/userAdress/${decodedToken.id}`, personalData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Update successful');
            router.push("/");
          } else {
            console.error('Update failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      const isValid =()=>{
        const isValidResult = (
          personalData.firstName !== undefined &&
          personalData.lastName !== undefined &&
          personalData.email !== undefined &&
          personalData.street !== undefined &&
          personalData.streetNumber !== undefined &&
          personalData.zipCode !== undefined &&
          personalData.city !== undefined &&
          personalData.entrance !== undefined
        );
      
        console.log('isValidResult:', isValidResult);
        
        return isValidResult;
      } 
      const handleCitySelect = (selectedCity) => {
        setPersonalData((prevData) => ({
          ...prevData,
          city: selectedCity,
        }));
        setCitySuggestions([]); // Clear suggestions after selecting a city
        setShowCitySuggestions(false);
      };


      return (
  <ProtectedRoute>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex">
          {decodedToken.role !== 'ADMIN' ? (
            <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-extrabold text-gray-900">My Previous Orders</h2>
          { orders.length == 0 && (<p className="mt-3">No previous orders.</p>)}
          {orders.map((order) => (
            <div key={order.id} className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Order ID: {order.id}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(order.created).toLocaleString()}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-sm font-medium text-gray-500">Total Price:</dt>
                    <dd className="text-sm text-gray-900">${order.price.toFixed(2)}</dd>
                  </div>
                  {order.products.map((product) => (
                    <div key={product.id} className="flex justify-between items-center py-2">
                      <dt className="text-sm font-medium text-gray-500">{product.name}</dt>
                      <dd className="text-sm text-gray-900">${product.price.toFixed(2)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
           ) : (
            
              <div>
               <h2 className="text-3xl font-extrabold text-gray-900 mt-2">All Users</h2>
                <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3" onClick={() => setShowUserModal(true)}>Show all users</button>
                <UserModal show={showUserModal} onClose={closeUserModal} setShowUserModal={setShowUserModal} id={decodedToken.id}/>
    
                </div>
          )}
     {/* </div> */}
        {decodedToken.role !== 'ADMIN' && (
        <div className="w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900">Personal Data</h2>
              {personalData && (
                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="mt-3 px-4 py-5 sm:px-6">
                  {(personalData.firstName && personalData.lastName) && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.firstName} {personalData.lastName}</p>
                    )}
                  {personalData.email &&  (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.email}</p>)}
                  {personalData.street  && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.street}, {personalData.streetNumber}</p>
                    )}
                  {personalData.streetNumber  && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.streetNumber}</p>
                  )}
                  { personalData.zipCode  && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.zipCode}</p>
                    )}
                     { personalData.city  && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{personalData.city}</p>
                     )}
                     { personalData.zipCode && (<p className="mt-1 max-w-2xl text-sm text-gray-500"> {personalData.entrance}</p> ) }
                     {(!isValid()&& !change) &&(<p>No adress information found.</p>)}
                     {change===false &&(
                     <button onClick={() => setChange(true)} className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >Update your Address
                      </button>)}

                    {change && ( 
                      <div> 
                        <input  name="firstname" value={personalData.firstName}
                        onChange={handleInputChange} className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={personalData.firstName}
                        />
                        <input  name="lastname" value={personalData.lastName}
                        onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={personalData.lastName}
                        />
                        <input  name="email" value={personalData.email}
                        onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={personalData.email}
                        />
                        <input onChange={handleInputChange} onClick={() => setShowCitySuggestions(true)}
                           name="city" value={personalData.city}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="city"
                        />
                      {showCitySuggestions && citySuggestions.length > 0 && (
                        <ul>
                            {citySuggestions.map((city, index) => (
                                <li key={index} onClick={() => handleCitySelect(city)} className="hover:bg-indigo-600 cursor-pointer">
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}

                        <input onChange={handleInputChange} name="street" value={personalData.street}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="street"
                        />
                        <input onChange={handleInputChange} name="streetNumber" value={personalData.streetNumber}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="streetNumber"
                        />
                        <input onChange={handleInputChange} name="zipCode" value={personalData.zipCode}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="zipCode"
                        />
                        <input onChange={handleInputChange} name="entrance" value={personalData.entrance}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="entrance"
                        />
                    </div>
                    )}
                  </div>
                </div>
              )}
              {change
              && ( 
                <button onClick={updatePersonalData} className={`${
                  isValid() ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={!isValid()}
                >Update</button>
               )}
            </div>
        )}
         {decodedToken.role === 'ADMIN' && (
          <div>
           <h2 className="text-3xl font-extrabold text-gray-900 mt-2">All Products</h2>
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3" onClick={() => setShowModal(true)}>Show all products</button>
            <AllProducts show={showModal} onClose={closeModal} setShowModal={setShowModal}/>
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3" onClick={() => setShowModalNewProduct(true)} >Create a new product</button>
            <NewProduct show={showModalNewProduct} onClose={closeModalNewProduct} setShowModal={setShowModalNewProduct}/>

            </div>
         )}
         
          </div>
          
        </div>
      </div>
    </ProtectedRoute>
  );
}

