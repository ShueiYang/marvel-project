import { Link } from "react-router-dom"
import{ useState, useContext } from "react"
import { RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri";
import useBookmark from "../../hooks/useBookmark";
import { MarvelContext } from "../../Store/reducer";
import { UserContext } from "../marvelContext/UserProvider";


const CharacterCard = ({data}) => {

  const { user, setVisible } = useContext(UserContext);
  const { state: {charBookmarks} } = useContext(MarvelContext);
  
  const [bookmarked, setBookmarked] = useState(()=> {
    const result = charBookmarks.find(bookmark => data._id === bookmark.characterId)
      if(result) {
        return true;
      }
      return false 
    } 
  );
  // custom hook for bookmark action
  const { addCharacter, deleteCharacter, error } = useBookmark();


  function toggleBookmark() {
    if(user) {
      if(!bookmarked) {
        addCharacter(data._id, data)
      } else {
        deleteCharacter(data._id)
      }
        setBookmarked(!bookmarked);
    } else {
      setVisible(true);
    }
  }


  const imgPath = data.thumbnail?.path
  const imgUrl = `${imgPath}/standard_large.${data.thumbnail?.extension}`

  return (
    <div className="character-card relative w-full h-auto rounded-xl">   
      <Link to={`/character/${data._id}`}>
        <div className="relative flex flex-col items-center w-full h-full">
          <img 
              src={ (!imgPath.includes("image_not_available")) ?  imgUrl : "/images/crepe-3.jpg" }
              alt={`character ${data.name}`}
              className="w-[65%] lg:w-full lg:rounded-t-xl aspect-square"
          />
          <h3 className="flex-1 px-2 title-desc">{data.name}</h3>    
          <p className="desc text-sm">
              {data.description ? data.description : "No description..."}
          </p>               
          <p  className="flex items-center text-[#155e75]">
              {`${data.comics.length} Comics`}
          </p>
        </div>
        {error && <p>{"Something went wrong couldn't update your bookmark"}</p> }
      </Link>

      <button 
        onClick={toggleBookmark}          
        className="absolute top-2 right-2 bg-red-900 p-1.5 rounded-full z-10 hover:opacity-60"
      >
        { bookmarked ? <RiBookmark3Fill className="text-xl text-[#F0C27B]"/>
          : <RiBookmark3Line className="text-xl text-[#F0C27B]"/>
        }
      </button>
    </div>
  ) 
}

export default CharacterCard;