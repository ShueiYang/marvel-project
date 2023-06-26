import axios from "axios";
import { useState, useContext } from "react";
import { MarvelContext, ACTION_TYPES } from "../Store/reducer";


function useBookmark() {
    
  const { dispatch, jwToken } = useContext(MarvelContext);
  const [error, setError] = useState(null);

  async function addCharacter(characterId, character) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookmark/character`,
        {
          characterId,  //shorthand
          character,
        }, 
        {
          headers: { Authorization: `Bearer ${jwToken}`}
        }
      );
      if (response.status === 201) {
        const newBookmark = response.data;
        dispatch({
          type: ACTION_TYPES.ADD_BOOKMARK,
          payload: newBookmark,
          bookmarkType: "charBookmarks",
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function addComic(comicId, comic) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookmark/comic`,
        {
          comicId,
          comic,
        },
        {
          headers: { Authorization: `Bearer ${jwToken}`}
        }
      );
      if (response.status === 201) {
        const newBookmark = response.data;
        dispatch({
          type: ACTION_TYPES.ADD_BOOKMARK,
          payload: newBookmark,
          bookmarkType: "comicBookmarks",
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function deleteCharacter(characterId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookmark/character/${characterId}`,
        {
          headers: { Authorization: `Bearer ${jwToken}`}
        }   
      );
      if (response.status === 200) {
        dispatch({
          type: ACTION_TYPES.DEL_BOOKMARK,
          payload: characterId,
          bookmarkType: "charBookmarks",
          id: "characterId",
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function deleteComic(comicId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookmark/comic/${comicId}`,
        {
          headers: { Authorization: `Bearer ${jwToken}`}
        }
      );
      if (response.status === 200) {
        dispatch({
          type: ACTION_TYPES.DEL_BOOKMARK,
          payload: comicId,
          bookmarkType: "comicBookmarks",
          id: "comicId",
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }
  return {
    addCharacter,
    addComic,
    deleteCharacter,
    deleteComic,
    error,
  };
}

export default useBookmark;