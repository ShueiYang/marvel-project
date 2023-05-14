import axios from "axios";


export async function getComicDetail (comicId) {   
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/comics/${comicId}`)
      if(response.status === 200) {
        return response;
      }  
    } catch (err) {
      console.error(err) 
      throw err;  
    }        
}