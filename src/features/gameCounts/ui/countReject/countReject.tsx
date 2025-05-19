import style from "./countReject.module.scss";
import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import { Typography } from "../../../../shared/ui/typography/typography";
import type { FC } from "react";

const CountRejectInitial: FC = () => {
  const countReject = useAppSelector((state) => state.gameCounts.countReject);

  return (
    <div className={style["count-reject"]}>
      <Typography thickness="bold" size="big">
        {countReject}
      </Typography>
      <div className={style["container-img"]}>
        <img
          className={style["reject-img-left"]}
          src="/images/left-side-broken-heart.png"
          alt="handshake"
        />
        <img
          className={style["reject-img-right"]}
          src="/images/right-side-broken-heart.png"
          alt="handshake"
        />
      </div>
    </div>
  );
};

export const CountReject = CountRejectInitial;
