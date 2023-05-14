import { useState, useContext } from "react";
import CharacterCard from "../components/items/CharacterCard";
import ComicsCard from "../components/items/ComicsCard";
import { MarvelContext } from "../Store/reducer";


const Favoris = () => {

  const { state: {charBookmarks, comicBookmarks} } = useContext(MarvelContext);

  const [page, setPage] = useState("character");

  
  return (
    <section className="container">
      <div>
        <h1>Favoris</h1>
        <div className="flex justify-center gap-8 text-[#F0C27B]">
          <div
            className="border border-[#F0C27B] px-2 hover:cursor-pointer"
            onClick={() => {
              setPage("character");
            }}
          >
            <h3>Character Favoris</h3>
          </div>
          <div
            className="border border-[#F0C27B] px-2 hover:cursor-pointer"
            onClick={() => {
              setPage("comic");
            }}
          >
            <h3>Comics Favoris</h3>
          </div>
        </div>
      </div>

      { page === "character" &&  
        <div className="w-full card mt-10">
          {charBookmarks.length === 0 ? (
            <h3 className="text-xl text-[#F0C27B]">No Bookmark found</h3>
          ) : (
            charBookmarks.map((bookmark) => {
              return (
                <div key={bookmark._id}>
                  <CharacterCard data={bookmark.character} />
                </div>
              );
            })
          )}
        </div>
      } 
      
      { page === "comic" && 
        <div className="w-full card mt-10">
          {comicBookmarks.length === 0 ? (
            <h3 className="text-xl text-[#F0C27B]">No Bookmark found</h3>
          ) : (
            comicBookmarks.map((bookmark) => {
              return (
                <div key={bookmark._id}>
                  <ComicsCard comicsData={bookmark.comic} />
                </div>
              );
            })
          )}
        </div>
      }
    </section>
  );
};

export default Favoris;
