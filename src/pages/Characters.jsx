import axios from "axios";
import { useEffect, useState, useContext, Fragment  } from "react";
import CharacterCard from "../components/items/CharacterCard";
import PaginatedItems from "../components/items/PaginatedItems";
import { MarvelContext, ACTION_TYPES } from "../Store/reducer";
import SearchBar from "../components/SearchBar";
import useSearchDebounce from "../hooks/useSearchDebounce";
import SkeletonLoader from "../components/loader/Skeleton";



const Characters = () => {

    const { state: {characters, loading, error}, dispatch } = useContext(MarvelContext);

    const [ count, setCount ] = useState(0);
    const [ limitPerPage, setLimitPerPage ] = useState(100);
    const [ skipItems, setSkipItems ] = useState(0);
    const [ queryName, setQueryName ] = useSearchDebounce();
 
    useEffect(() =>{
        // make a cancel request to cancel ongoing request if no longer need
        // and optimize network usage and useful when user perform another action 
        // that make the request irrevelent.
        const controller = new AbortController();
        const { signal } = controller;
  
        async function getMarvelCharacters() {   
          try {
            dispatch({ type: ACTION_TYPES.FETCH_DATA })
             
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters`, {
                signal,
                params: {
                    skip: skipItems,
                    name: queryName
                }
            })     
            dispatch({
                type: ACTION_TYPES.SET_CHARACTERS,
                payload: response.data.results
            })
            setCount(response.data.count);
            setLimitPerPage(response.data.limit);     
           
          } catch (err) {
            if (err.name === "CanceledError") {
              console.log("Request cancelled!");
            } else {
              console.error(err) 
              dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err.message }) 
            }      
          } 
        }
        getMarvelCharacters();
        return () => {
          controller.abort();
        }      
    }, [skipItems, queryName, dispatch]);


  if(error)
    return <h1 className="text-center">{error}</h1>

  return (
    <section className="container relative">
     <SearchBar 
        datas={characters}
        querySearch={queryName}    
        setQuerySearch={setQueryName}
        placeholder={"Search character by name..."}
     />

     <h1>Marvel Characters</h1> 
     <div className="flex flex-wrap justify-between mb-12">
        <div className="flex gap-6 items-center mb-6 lg:mb-0">
          <span>{`Total Count: ${count}`}</span>
          <span>{`Currentpage result: ${characters.length}`}</span>
        </div>     
        <div className="W-full mx-auto lg:mr-0">     
          <PaginatedItems 
            count={count}
            limitPerPage={limitPerPage}
            setSkipItems={setSkipItems}
         />               
        </div>
     </div>

     { loading ? 
       <SkeletonLoader />
     
     : characters.length === 0 ? 
       <h2 className="text-center">No result Found</h2>

     : <div className="w-full card mt-6">
        {characters.map(character => {
          return (
           <Fragment key={character._id}>
             <CharacterCard data={character} />
           </Fragment>
          )
        })
       }
       </div>
     }    
    </section>
  )
}

export default Characters;