import style from "./playerDisplay.module.scss";
import { memo, type FC } from "react";
import { PlayerAvatar } from "../playerAvatar/playerAvatar";
import { PlayerName } from "../playerName/playerName";
import type { Player } from "../../model/types";

type PlayerDisplayInitialProps = {
  player: Player;
};

const PlayerDisplayInitial: FC<PlayerDisplayInitialProps> = ({ player }) => {
  return (
    <div className={style["player-display"]}>
      <PlayerAvatar srcImg={player.img} playerId={player.id} />
      <PlayerName name={player.name} />
    </div>
  );
};

export const PlayerDisplay = memo(PlayerDisplayInitial);
