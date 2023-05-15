import axios from "axios";
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



function App() {

  const { user } = useContext(UserContext);
  const { dispatch } = useContext(MarvelContext);
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


  return (
    <>
      <Navbar visible={visible} setVisible={setVisible} />
       <HeroSection />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/character/:id" element={<CharacterInfo />} />
          <Route path="/comic/:id" element={<ComicInfo /> } />
          <Route element={<PrivateRoutes user={user} setVisible={setVisible} />}>
            <Route path="/favoris" element={<Favoris />} />
          </Route>
        </Routes>
      <Footer />
      {visible && <Modal setVisible={setVisible}/>}   
    </>
  )
}

export default App; 
