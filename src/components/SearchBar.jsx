import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";


const SearchBar = ({ datas, querySearch, setQuerySearch, placeholder }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef();

  const [ open, setOpen ] = useState(false);

  function handleClick(id) {
    setOpen(false)
    if(location.pathname === "/comics") {
      navigate(`/comic/${id}`)
    } else {
      navigate(`/character/${id}`)
    }
  }

  useEffect(() => {
    if(querySearch !== "") {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [querySearch]);

  // custom hook to close dropdown menu when click outside
  useClickOutside(searchRef, ()=> setOpen(false));

  return (
    <div className="wrapper relative z-50 mt-12 w-[85%] sm:absolute sm:-top-36 md:-top-44 lg:-top-48 sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[33%]">
      <div className="relative w-full h-full" ref={searchRef} >
        <input  
          className={`${open ? "rounded-b-none" : "rounded-b-3xl"}
          search w-full h-full py-1.5 pl-10 pr-6 rounded-t-3xl outline-none
          `}
          type="text"  
          onChange={(event)=> {
            setQuerySearch(event.target.value)
          }}
          placeholder={placeholder}
        />
        {open && 
          <div className="dropdown mt-0">
            <div className="flex flex-col w-full px-2">
              { datas.slice(0,8).map(datas => {
                return (
                  <ul key={datas._id}
                    className="optionList"
                    onClick={()=> {handleClick(datas._id)}}    
                  >
                    <li>{datas.name? datas.name : datas.title}</li>
                  </ul>
                )
               })
              }
            </div>
          </div>
        }  
        <FaSearch className="absolute top-2 left-3 text-xl" />
      </div>
    </div>
  )
}

export default SearchBar;