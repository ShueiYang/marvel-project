

const ComicDetail = ({data}) => {

    const imgPath = data.thumbnail?.path
    const imgUrl = `${imgPath}/portrait_medium.${data.thumbnail?.extension}`


  return (
    <div className="flex justify-center w-[80%] mx-auto mt-8">
        <div className="flex w-1/3 items-center">
            <img 
                src={ (!imgPath.includes("image_not_available")) ?  imgUrl 
                : "/images/crepe-3.jpg" 
            }
                alt={`character ${data.title}`}
                className="max-w-[150px] h-auto mx-auto"
            />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
            <h3 className="text-xl text-[#F0C27B]">{data.title}</h3>
            <p className="text-slate-50"> {data.description ? data.description : "No description..."}</p>
        </div>
    </div>   
  )
}

export default ComicDetail;