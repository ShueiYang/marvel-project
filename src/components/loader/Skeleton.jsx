
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


const SkeletonLoader = () => {

  const skeletonDatas = Array.from({ length: 24 });


  return (
    <SkeletonTheme baseColor="#115e59" highlightColor="#14b8a6">
      <div className="card">
      {skeletonDatas.map((_, index) => {
        return (
        <div className="flex flex-col gap-2" key={index}>
          <Skeleton height={180} />
          <Skeleton count={4} />
        </div>
       )
      })}
     </div>     
    </SkeletonTheme>
  )
}

export default SkeletonLoader;