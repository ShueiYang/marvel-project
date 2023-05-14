import { useReducer } from "react";
import { MarvelContext, storeReducer } from "../../Store/reducer";


const MarvelProvider = ({ children }) => {
  
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
    <MarvelContext.Provider value={{ state, dispatch }}>
      {children}
    </MarvelContext.Provider>
  );
};
export default MarvelProvider;
