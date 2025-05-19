import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import style from "./playerAvatar.module.scss";
import { memo, type FC } from "react";

type PlayerAvatarInitialProps = {
  srcImg: string;
  playerId: number;
};

const PlayerAvatarInitial: FC<PlayerAvatarInitialProps> = ({
  srcImg,
  playerId,
}) => {
  const currentPlayer = useAppSelector((state) => state.players.currentPlayer);

  return (
    <>
      <img
        className={`${style["player-img"]} ${
          currentPlayer === playerId ? style["player-img__active"] : ""
        }`}
        src={srcImg}
        alt="player-avatar"
      />
    </>
  );
};

export const PlayerAvatar = memo(PlayerAvatarInitial);
