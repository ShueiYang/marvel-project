import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Skeleton2 = () => {


  return (
    <SkeletonTheme baseColor="#115e59" highlightColor="#14b8a6">
      <div className="container h-auto flex flex-col mt-20">
        <div className="flex justify-center w-[80%] mx-auto gap-8">
          <div className="flex w-1/3 items-center">
            <Skeleton count={1} height={200} containerClassName="flex-1" />
          </div>
          <div className="flex w-2/3 flex-col">
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
          </div>
        </div>
      </div>

      <div className="container h-auto flex flex-col mt-20">
        <div className="flex justify-center w-[80%] mx-auto gap-8">
          <div className="flex w-1/3 items-center">
            <Skeleton count={1} height={200} containerClassName="flex-1" />
          </div>
          <div className="flex w-2/3 flex-col">
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
            <Skeleton count={1} containerClassName="flex-1" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Skeleton2;
