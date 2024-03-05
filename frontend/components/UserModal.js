import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UserModal = ({ show, onClose, id }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  let totalPages = Math.ceil(users.length / usersPerPage);
  const noUsers = users.length === 0;
  const [searchForUser, setSearchForUser] = useState('');

  useEffect(() => {
    console.log(id);

    axios
      .get(`http://localhost:8086/allUsers/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
          totalPages = Math.ceil(response.data.length / usersPerPage);
        } else {
          console.error('Users request failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]); 

  const handleSearch = () => {
    if (searchForUser !== '') {
      const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchForUser.toLowerCase())
      );
      setUsers(filteredUsers);
      setCurrentPage(1);
      
      console.log(users);
      totalPages =Math.ceil(filteredUsers.length / usersPerPage);
    }

    else{
      axios
      .get(`http://localhost:8086/allUsers/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
          totalPages = Math.ceil(response.data.length / usersPerPage);
        } else {
          console.error('Users request failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
            <h2>All users</h2>
            

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
                  value={searchForUser}
                  onChange={(e) => setSearchForUser(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              </div>
            <button onClick={onClose} className="text-blue-500 hover:text-blue-700">
              Close
            </button>
          </div>
          <div className="p-6">
            <table   className="w-full"
              style={{
                border: '1px solid #e2e8f0', // Add a thin border
                borderCollapse: 'collapse',
                width: '100%',
                margin: 0,
                padding: 0,
              }}>
              {noUsers ? (
                <p>No users to display.</p>
              ) : (
                <React.Fragment>
                <thead>
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">First Name</th>
                    <th className="p-2 text-left">Last Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                  <tr key={user.id}  className="cursor-pointer hover:bg-gray-100"> 
                    <td className="p-2 text-left">{user.id}</td>
                    <td className="p-2 text-left">{user.firstName}</td>
                    <td className="p-2 text-left">{user.lastName}</td>
                    <td className="p-2 text-left">{user.email}</td>
                    <td className="p-2 text-left">{user.phone}</td>
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
    </div>
  );
};

export default UserModal;
