import axios from "axios";
import { useEffect, useState, useContext, Fragment } from "react";
import ComicsCard from "../components/items/ComicsCard";
import PaginatedItems from "../components/items/PaginatedItems";
import { MarvelContext, ACTION_TYPES } from "../Store/reducer";
import SearchBar from "../components/SearchBar";
import useSearchDebounce from "../hooks/useSearchDebounce";
import SkeletonLoader from "../components/loader/Skeleton";


const Comics = () => {

  const { state: {comics, loading, error}, dispatch } = useContext(MarvelContext);

  const [ count, setCount ] = useState(0);
  const [ limitPerPage, setLimitPerPage ] = useState(100);
  const [ skipItems, setSkipItems ] = useState(0)
  const [ queryTitle, setQueryTitle ] = useSearchDebounce();

  useEffect(() =>{
    const controller = new AbortController();
    const { signal } = controller;

    async function getMarvelComics() {  
      try {
        dispatch({ type: ACTION_TYPES.FETCH_DATA }) 
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comics`, {
            signal,
            params: {
              skip: skipItems,
              title: queryTitle,
          }  
        })     
        dispatch({
          type: ACTION_TYPES.SET_COMICS,
          payload: response.data.results
        })
        setCount(response.data.count);
        setLimitPerPage(response.data.limit); 

      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Request cancelled!");
        } else {
          console.error(err)  
          dispatch({ type: ACTION_TYPES.SET_ERROR, payload: err.message }) 
        }     
      }  
    }
    getMarvelComics();

    return () => {
      controller.abort();
    }      
}, [skipItems, queryTitle, dispatch]);


  if(error)
    return <h1 className="text-center">{error}</h1>

  return (
    <section className="container relative">
      <SearchBar 
        datas={comics}
        querySearch={queryTitle}    
        setQuerySearch={setQueryTitle}
        placeholder={"Search comics by title..."}    
      />

     <h1>Marvel Comics</h1> 
     <div className="flex flex-wrap justify-between mb-12">
        <div className="flex gap-6 items-center mb-6 lg:mb-0">
          <span>{`Total Count: ${count}`}</span>
          <span>{`Currentpage result: ${comics.length}`}</span>
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
     
      : comics.length === 0 ?
        <h2 className="text-center">No result Found</h2>
      
      : <div className="relative w-full card mt-6 z-0">
        { comics.map(comic => {
          return (
            <Fragment key={comic._id}>
              <ComicsCard comicsData={comic} />
            </Fragment>    
          )
         })
        }
        </div> 
      }    
   </section>
  )
}

export default Comics;