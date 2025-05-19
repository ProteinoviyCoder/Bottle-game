import style from "./gamePageSkeleton.module.scss";

const GamePageSkeletonInitial = () => {
  return (
    <div className={style["container"]}>
      <div className={style["bg-blur"]}></div>
      <div className={style["container-skeleton"]}>
        <div className={style["circle"]}></div>
      </div>
    </div>
  );
};

export const GamePageSkeleton = GamePageSkeletonInitial;
