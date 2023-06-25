import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState, useEffect, useContext } from "react";
import { MarvelContext } from "../../Store/reducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const { jwToken } = useContext(MarvelContext);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login`, {
          headers: {
            Authorization: `Bearer ${jwToken}`
          }
        })
        if(response.status === 200 && response.data.success) {
          setUser(response.data.user)
        }     
      } catch (err) {
        console.log(err.message)
        Cookies.remove("marvel-jwt")
      }
    }
    if(jwToken) {
      getUser();
    } 
  }, [jwToken]);

  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;