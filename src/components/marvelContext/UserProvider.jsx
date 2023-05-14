import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();


const UserProvider = ({ children }) => {

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login`, {
          withCredentials: true, 
        })
        if(response.status === 200 && response.data.success) {
          setUser(response.data.user)
        }     
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  }, []);

  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;