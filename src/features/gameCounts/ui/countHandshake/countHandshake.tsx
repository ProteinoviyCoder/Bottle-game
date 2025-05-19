import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import { Typography } from "../../../../shared/ui/typography/typography";
import style from "./countHandshake.module.scss";
import type { FC } from "react";

const CountHandshakeInitial: FC = () => {
  const countHandshake = useAppSelector(
    (state) => state.gameCounts.countHandshake
  );

  return (
    <div className={style["count-handshake"]}>
      <Typography thickness="bold" size="big">
        {countHandshake}
      </Typography>
      <img
        className={style["handshake-img"]}
        src="./images/handshake.png"
        alt="handshake"
      />
    </div>
  );
};

export const CountHandshake = CountHandshakeInitial;
