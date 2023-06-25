import axios from "axios";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Navbar"
import Footer from "./components/Footer"
import Characters from "./pages/Characters";
import HeroSection from "./components/Herosection/HeroSection";
import Modal from "./components/Modal";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "./components/marvelContext/UserProvider";
import { MarvelContext, ACTION_TYPES } from "./Store/reducer";
import Comics from "./pages/Comics";
import CharacterInfo from "./pages/CharacterInfo";
import ComicInfo from "./pages/ComicInfo";
import Favoris from "./pages/Favoris";
import PrivateRoutes from "./components/PrivateRoute";
import OauthCallback from "./pages/OauthCallback";


function App() {

  const { user } = useContext(UserContext);
  const { dispatch, setJwToken } = useContext(MarvelContext);
  const [ visible, setVisible ] = useState(false);

  useEffect(() => {
    async function getBookmarks(){
      try {
      const [ characterArray, comicArray ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/bookmark/character?userId=${user.id}`),
        axios.get(`${import.meta.env.VITE_API_URL}/bookmark/comic?userId=${user.id}`)
      ])  
        dispatch({
          type: ACTION_TYPES.SET_CHAR_BOOKMARK,
          payload: characterArray.data
        })
        dispatch({
          type: ACTION_TYPES.SET_COMIC_BOOKMARK,
          payload: comicArray.data
        })
      } catch (err) {
        console.error(err)
      }
    }
    if(user) {
      getBookmarks();
    }  
  }, [user, dispatch]);  

  function handleJWT (token) {
    if(token) {
      setJwToken(token)
      Cookies.set("marvel-jwt", 
        token, {
          expires: 1,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production"    
        })
    } else {
      setJwToken("");
      Cookies.remove("marvel-jwt")
    }
  }

  return (
    <>
      <Navbar visible={visible} setVisible={setVisible} handleJWT={handleJWT} />
       <HeroSection />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/character/:id" element={<CharacterInfo />} />
          <Route path="/comic/:id" element={<ComicInfo /> } />
          <Route path="/oauth/google/callback" element={<OauthCallback handleJWT={handleJWT}/> } />
          <Route element={<PrivateRoutes user={user} />}>
            <Route path="/favoris" element={<Favoris />} />
          </Route>
        </Routes>
      <Footer />
      {visible && <Modal setVisible={setVisible}/>}   
    </>
  )
}

export default App; 
