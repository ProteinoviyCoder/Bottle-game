import style from "./countKiss.module.scss";
import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import { Typography } from "../../../../shared/ui/typography/typography";
import type { FC } from "react";

const CountKissInitial: FC = () => {
  const countKiss = useAppSelector((state) => state.gameCounts.countKiss);

  return (
    <div className={style["count-kiss"]}>
      <Typography thickness="bold" size="big">
        {countKiss}
      </Typography>
      <img
        className={style["kiss-img"]}
        src="/images/kiss.png"
        alt="handshake"
      />
    </div>
  );
};

export const CountKiss = CountKissInitial;
