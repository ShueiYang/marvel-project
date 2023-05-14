import { createContext } from "react";

export const MarvelContext = createContext();


export const ACTION_TYPES = {
  SET_CHARACTERS: "SET_CHARACTERS",
  SET_COMICS: "SET_COMICS",
  SET_CHAR_BOOKMARK: "SET_CHAR_BOOKMARK",
  SET_COMIC_BOOKMARK: "SET_COMIC_BOOKMARK",
  FETCH_DATA: "FETCH_DATA",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_BOOKMARK: "ADD_BOOKMARK",
  DEL_BOOKMARK: "DEL_BOOKMARK",
}


export function storeReducer(state, action) {
    
  switch (action.type) {
    case "SET_CHARACTERS":
      return { 
        ...state, 
        loading: false, 
        characters: action.payload
      };
    case "SET_COMICS":
      return { 
        ...state, 
        loading: false,
        comics: action.payload
      };
    case "SET_CHAR_BOOKMARK":
      return { 
        ...state, 
        charBookmarks: action.payload
      };
    case "SET_COMIC_BOOKMARK":
      return { 
        ...state, 
        comicBookmarks: action.payload
      };
    case "FETCH_DATA":
      return { 
        ...state, 
        loading: true 
      };
    case "FETCH_ERROR":
      return { 
        ...state,
        loading: false, 
        error: action.payload
      };
    case "ADD_BOOKMARK":
      return {
        ...state,
        [action.bookmarkType]: [...state[action.bookmarkType], action.payload],
    };
    case "DEL_BOOKMARK":
      return {
        ...state,
        [action.bookmarkType]: state[action.bookmarkType].filter(bookmark => bookmark[action.id] !== action.payload)  //dynamic update on bookmarkType and bookmark id ..
    };   
    default:
      throw new Error(`Unhandle action type: ${action.type}`)
  }
}