import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { getComicDetail } from "../services/apiRequest";
import ComicDetail from "../components/items/ComicDetail";
import Skeleton2 from "../components/loader/Skeleton2";


const CharacterInfo = () => {

  const { id } = useParams();

  const [ character, setCharacter ] = useState({});
  const [ comicInfo, setComicInfo ] = useState({});
  const [ loading, setLoading ] = useState(true); 
  const [ error, setError ] = useState(null);
  
    
    useEffect(()=> {

      async function getCharacterDetail() {            
        try {        
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters/${id}`)
          
          const getComicsData = await Promise.all(
              response.data.comics.map( async(comicId )=> {
                  const resp = await getComicDetail(comicId)
                  return resp.data
              })
          )
          setCharacter(response.data)
          setComicInfo([...getComicsData]) 

          setLoading(false)

        } catch (err) {
          if (err.name === "CanceledError") {
            console.log("Request cancelled!");
          } else {
            console.error(err)
            setError(err.message)
          }        
        } 
      }
      getCharacterDetail();
      
    }, [id]);
    

    const imgPath = character?.thumbnail?.path
    const imgUrl = `${imgPath}/portrait_fantastic.${character?.thumbnail?.extension}`


  if(loading) 
   return <Skeleton2 />

  if(error)
   return <h1 className="text-center">{error}</h1>

  return (
    <article className="container h-auto flex flex-col">

        <div className="flex justify-center w-[80%] mx-auto">
          <div className="flex w-1/3 items-center">
            <img 
              src={(!imgPath.includes("image_not_available")) ? imgUrl 
              : "/images/crepe-3.jpg" 
            }
              alt={`character ${character.name}`}
              className="max-h-[252px] mx-auto"
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1>{character.name}</h1>
            <p className="hero-detail"> {character.description ? character.description : "No description..."}</p>
          </div>
        </div>

        <h2>{`${character.name} Comics`}</h2> 
        { comicInfo.length === 0 ?
          <h3 className="text-[#F0C27B]">It seen there is no comics assigned to this character.</h3>
        
        : comicInfo.map(comic => {
            return (
              <Fragment key={comic._id}>
                <ComicDetail data={comic} />
              </Fragment>  
            )                
          })   
        }          
    </article>
  )
}

export default CharacterInfo;