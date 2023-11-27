import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { message } from 'antd';

function Logout() {
  const navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")){
    // Function to delete the token from local storage
    const logoutUser = async() => {
      localStorage.removeItem("token");
    };

    // Call the logout function when the component mounts
   logoutUser();
   message.warning("Logout Successfully!")
  }
   navigate('/login')
   
  }, []); // The empty dependency array ensures that this effect runs only once on mount
  
   

  return (
    <div>
      <h2>Logout</h2>
      {/* You can add other content related to the logout page */}
    </div>
  );
}

export default Logout;
