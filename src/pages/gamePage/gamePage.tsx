import { GameBottle } from "../../features/gameBottle/ui/bottle/gameBottle";
import { GameCircle } from "../../features/gameCircle/ui/gameCircle/gameCircle";
import { DisplayCounts } from "../../features/gameCounts/ui/displayCounts/displayCounts";
import { useAppSelector } from "../../shared/hooks/redux/useAppSelector";
import style from "./gamePage.module.scss";

const GamePageInitial = () => {
  const players = useAppSelector((state) => state.players.allPlayers);

  return (
    <div className={style["container"]}>
      <div className={style["container-skeleton"]}>
        <GameCircle players={players}>
          <GameBottle players={players} />
        </GameCircle>
        <DisplayCounts />
      </div>
    </div>
  );
};

const GamePage = GamePageInitial;
export default GamePage;
