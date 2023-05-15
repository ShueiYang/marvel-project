import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../marvelContext/UserProvider";


const Navbar = ({ visible, setVisible }) => {
  
  const { user, setUser } = useContext(UserContext);

  function sessionLogOut() {
    setUser(null);
    window.open(`${import.meta.env.VITE_API_URL}/auth/logout`, "_self");
  }
  
  return (  
    <header className="w-full h-16">
      <nav className="container h-full relative flex justify-between items-center">
        <Link to="/"  className="marvel">
          <img src="/logo.svg" alt="logo marvel"/>
       </Link> 
        <div className="flex gap-4">
          <Link to="/">
            Characters    
          </Link>

          <Link to="/comics">
            Comics 
          </Link>

          <Link to="/favoris">
            Favoris    
          </Link>
        </div>

        <div className="flex justify-between">
         { user ?     
            <div className="login flex items-center">
              <img 
                src={user.photos[0].value} 
                className="w-6 rounded-full mr-2"
                alt={user.displayName}
              />
              <span>{user.displayName}</span>

              <button className="mx-4" onClick={sessionLogOut}>
                <span>Sign Out</span> 
              </button>
            </div>
         : <button onClick={()=> {setVisible(!visible)}} className="hover:cursor-pointer">
            Sign In
          </button>
         }     
        </div>
      </nav>
    </header>
  )
}


export default Navbar;