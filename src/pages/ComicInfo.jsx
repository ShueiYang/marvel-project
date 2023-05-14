import { useParams } from "react-router-dom";
import { useEffect, useState,} from "react";
import { getComicDetail } from "../services/apiRequest";
import Skeleton2 from "../components/loader/Skeleton2";

const ComicInfo = () => {

  const { id } = useParams();
  const [ comicInfo, setComicInfo ] = useState({})
  const [loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  
  useEffect(()=> {
    async function getComic() {
      try {
        const response = await getComicDetail(id)
        setComicInfo(response.data)  
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(err.message)
      }     
    }
    getComic()
  }, [id]);

  const imgPath = comicInfo?.thumbnail?.path
  const imgUrl = `${imgPath}/portrait_uncanny.${comicInfo?.thumbnail?.extension}`

  if(loading) 
    return <Skeleton2/>

  if(error)
   return <h1 className="text-center">{error}</h1>

  return (
    <article className="container h-auto flex flex-col">      
        <img 
            src={(!imgPath.includes("image_not_available")) ? imgUrl 
            : "/images/crepe-3.jpg" 
        }
            alt={`comic ${comicInfo.title}`}
            className="max-h-[252px] mx-auto"
        />   
        <div className="flex-1 flex flex-col items-center justify-center gap-y-4">
          <h1 className="my-4">{comicInfo.title}</h1>
          <p className="hero-detail"> {comicInfo.description ? comicInfo.description : "No description..."}</p>
        </div>   
    </article>  
  )
}

export default ComicInfo;