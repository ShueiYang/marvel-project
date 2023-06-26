import { Link } from "react-router-dom"
import{ useState, useContext } from "react"
import { RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri";
import useBookmark from "../../hooks/useBookmark";
import { MarvelContext } from "../../Store/reducer";
import { UserContext } from "../marvelContext/UserProvider";

const ComicsCard = ({comicsData}) => {

  const { user, setVisible } = useContext(UserContext);
  const { state: {comicBookmarks} } = useContext(MarvelContext);

  const [bookmarked, setBookmarked] = useState(()=> {
    const result = comicBookmarks.find(bookmark => comicsData._id === bookmark.comicId)
      if(result) {
        return true;
      }
      return false 
    } 
  );
  // custom hook for bookmark action
  const { addComic, deleteComic, error } = useBookmark();


  function toggleBookmark() {
    if(user) {
      if(!bookmarked) {
        addComic(comicsData._id, comicsData)
      } else {
        deleteComic(comicsData._id)
      }
        setBookmarked(!bookmarked);
    } else {
      setVisible(true);
    }
  }

  const imgPath = comicsData.thumbnail.path
  const imgUrl = `${imgPath}/standard_large.${comicsData.thumbnail.extension}`

  return (
    <div className="comic-card relative w-full h-auto rounded-xl">   
      <Link to={`/comic/${comicsData._id}`}>
        <div className="flex flex-col items-center w-full h-full">
          <img 
              src={ (!imgPath.includes("image_not_available")) ?  imgUrl : "/images/crepe-1.jpg" }
              alt={`Comic ${comicsData.title}`} 
              className="w-[65%] lg:w-full lg:rounded-t-xl aspect-square"
          />
          <h3 className="flex-1 px-2 title-desc">{comicsData.title}</h3>    
          <p className="comic-desc text-sm">
              {comicsData.description ? comicsData.description : "No description..."}
          </p> 
          {error && <p>{"Something went wrong couldn't update your bookmark"}</p> }        
        </div>
      </Link>
      
      <button 
        onClick={toggleBookmark}          
        className="absolute bottom-2 right-2 bg-red-900 p-1.5 rounded-full z-10 hover:opacity-60"
      >
        { bookmarked ? <RiBookmark3Fill className="text-xl text-[#F0C27B]"/>
          : <RiBookmark3Line className="text-xl text-[#F0C27B]"/>
        }
      </button>
       
    </div>
  ) 
}

export default ComicsCard;