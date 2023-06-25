import Cookies from "js-cookie";
import { useReducer, useState } from "react";
import { MarvelContext, storeReducer } from "../../Store/reducer";


const MarvelProvider = ({ children }) => {
  
  const [ jwToken, setJwToken ] = useState(Cookies.get("marvel-jwt" || null));

  const initialState = {
    characters: [],
    comics: [],
    charBookmarks: [],
    comicBookmarks: [],
    loading: false,
    error: null,
  };

  const [ state, dispatch ] = useReducer(storeReducer, initialState);

  return (
    <MarvelContext.Provider value={{ state, dispatch, jwToken, setJwToken }}>
      {children}
    </MarvelContext.Provider>
  );
};
export default MarvelProvider;
