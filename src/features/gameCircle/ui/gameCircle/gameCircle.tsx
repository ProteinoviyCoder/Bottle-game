import type { Player } from "../../../../entities/player/model/types";
import { PlayerDisplay } from "../../../../entities/player/ui/playerDisplay/playerDisplay";
import { calculateCircleCoords } from "../../lib/calculateCircleCoords";
import { AnimFlightPlayers } from "../animFlightPlayers/animFlightPlayers";
import style from "./gameCircle.module.scss";
import { memo, useRef, type FC, type ReactNode } from "react";

type GameCircleInitialProps = {
  players: Player[];
  children: ReactNode;
};

const GameCircleInitial: FC<GameCircleInitialProps> = ({
  players,
  children,
}) => {
  const refCircleChildElements = useRef<HTMLDivElement[]>([]);

  return (
    <div className={style["circle"]}>
      {players.map((player, index) => {
        const { coordX, coordY } = calculateCircleCoords(index, players.length);

        return (
          <div
            key={player.id}
            ref={(element) => {
              if (element) {
                refCircleChildElements.current[index] = element;
              }
            }}
            className={`${style["circle-element"]} `}
            style={{
              left: `${coordX}%`,
              top: `${coordY}%`,
            }}
          >
            <PlayerDisplay player={player} />
          </div>
        );
      })}
      <AnimFlightPlayers
        players={players}
        elements={refCircleChildElements.current}
        propsClassName={style["circle-element"]}
      />
      {children}
    </div>
  );
};

export const GameCircle = memo(GameCircleInitial);
