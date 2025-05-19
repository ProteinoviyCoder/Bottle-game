import style from "./animFlightPlayers.module.scss";
import { useEffect, useLayoutEffect, useRef, useState, type FC } from "react";
import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import type { Player } from "../../../../entities/player/model/types";
import { createPortal } from "react-dom";
import { PlayerDisplay } from "../../../../entities/player/ui/playerDisplay/playerDisplay";
import { useAppDispatch } from "../../../../shared/hooks/redux/useAppDispatch";
import {
  actionChangeCurrentPlayer,
  actionResetSelectedPlayer,
} from "../../../../entities/player/model/playersSliceStore";
import {
  actionIncrementCountHandshake,
  actionIncrementCountKiss,
  actionIncrementCountReject,
} from "../../../gameCounts/model/gameCountsSlice";

type FlyingPlayerCoords = {
  coordX: number;
  coordY: number;
  indexPlayer: number;
  width: number;
  height: number;
};

type FlyingPlayersCoords = {
  coordsCurrentPlayerDiv: FlyingPlayerCoords;
  coordsSelectedPlayerDiv: FlyingPlayerCoords;
};

type AnimFlightPlayersInitialProps = {
  elements: HTMLDivElement[];
  players: Player[];
  propsClassName: string;
};

const AnimFlightPlayersInitial: FC<AnimFlightPlayersInitialProps> = ({
  elements,
  players,
  propsClassName,
}) => {
  const dispatch = useAppDispatch();
  const { currentPlayer, selectedPlayer } = useAppSelector(
    (state) => state.players
  );
  const gameScript = useAppSelector((state) => state.gameScript.gameScript);

  const [isRenderPlayerDisplay, setIsRenderPlayerDisplay] =
    useState<boolean>(false);

  const refCurrentPlayer = useRef<HTMLDivElement | null>(null);
  const refSelectedPlayer = useRef<HTMLDivElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);
  const refKiss = useRef<HTMLImageElement | null>(null);
  const refLeftHeart = useRef<HTMLImageElement | null>(null);
  const refRightHeart = useRef<HTMLImageElement | null>(null);
  const refHandshake = useRef<HTMLImageElement | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculateCoordsFlyingPlayers = (
    currentPlayer: number,
    selectedPlayer: number
  ): FlyingPlayersCoords => {
    const indexCurrentPlayerDiv = players.findIndex(
      (player) => player.id === currentPlayer
    );

    const currentPlayerDiv =
      elements[indexCurrentPlayerDiv].getBoundingClientRect();
    const coordsCurrentPlayerDiv = {
      coordX: currentPlayerDiv.left,
      coordY: currentPlayerDiv.top,
      indexPlayer: indexCurrentPlayerDiv,
      width: currentPlayerDiv.width,
      height: currentPlayerDiv.height,
    };

    const indexSelectedPlayerDiv = players.findIndex(
      (player) => player.id === selectedPlayer
    );

    const selectedPlayerDiv =
      elements[indexSelectedPlayerDiv].getBoundingClientRect();
    const coordsSelectedPlayerDiv = {
      coordX: selectedPlayerDiv.left,
      coordY: selectedPlayerDiv.top,
      indexPlayer: indexSelectedPlayerDiv,
      width: selectedPlayerDiv.width,
      height: selectedPlayerDiv.height,
    };

    return {
      coordsCurrentPlayerDiv,
      coordsSelectedPlayerDiv,
    };
  };

  const resetPositionPlayers = () => {
    if (!selectedPlayer) return;

    const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
      calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

    refCurrentPlayer.current!.style.left = `${coordsCurrentPlayerDiv.coordX}px`;
    refCurrentPlayer.current!.style.top = `${coordsCurrentPlayerDiv.coordY}px`;
    refCurrentPlayer.current!.style.transform = `translate(0) scale(1)`;
    refSelectedPlayer.current!.style.left = `${coordsSelectedPlayerDiv.coordX}px`;
    refSelectedPlayer.current!.style.top = `${coordsSelectedPlayerDiv.coordY}px`;
    refSelectedPlayer.current!.style.transform = `translate(0) scale(1)`;
    refContainer.current!.style.backgroundColor = "rgba(1,1,1,0)";
  };

  useLayoutEffect(() => {
    if (
      !elements.length ||
      !refCurrentPlayer.current ||
      !refSelectedPlayer.current ||
      !selectedPlayer
    )
      return;

    resetPositionPlayers();

    if (!isRenderPlayerDisplay) {
      setIsRenderPlayerDisplay(true);
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (
      !refCurrentPlayer.current ||
      !refSelectedPlayer.current ||
      !refContainer.current ||
      !selectedPlayer
    )
      return;

    const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
      calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

    elements[coordsCurrentPlayerDiv.indexPlayer].style.opacity = "0";
    elements[coordsSelectedPlayerDiv.indexPlayer].style.opacity = "0";

    const obsrverResize = new ResizeObserver(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (
          !refCurrentPlayer.current ||
          !refSelectedPlayer.current ||
          !elements ||
          !elements.length
        )
          return;

        const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
          calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

        const windowWidth = window.innerWidth;
        const windowHeigh = window.innerHeight;

        refCurrentPlayer.current.style.left = `${
          windowWidth / 2 - coordsCurrentPlayerDiv.width * 2.4
        }px`;
        refCurrentPlayer.current.style.top = `${
          windowHeigh / 2 - coordsCurrentPlayerDiv.height / 2
        }px`;
        refCurrentPlayer.current.style.transform = `translate(0) scale(1.6)`;

        refSelectedPlayer.current.style.left = `${
          windowWidth / 2 + coordsSelectedPlayerDiv.width * 1.4
        }px`;
        refSelectedPlayer.current.style.top = `${
          windowHeigh / 2 - coordsSelectedPlayerDiv.height / 2
        }px`;
        refSelectedPlayer.current.style.transform = `translate(0) scale(1.6)`;
      }, 100);
    });

    obsrverResize.observe(document.body);

    refContainer.current.style.backgroundColor = "rgba(1,1,1,0.7)";

    return () => {
      obsrverResize.disconnect();
    };
  }, [selectedPlayer]);

  useEffect(() => {
    if (!selectedPlayer || gameScript !== "kiss" || !refKiss.current) return;

    const audio = new Audio("/sounds/kiss-sound.mp3");
    audio.play();

    refKiss.current.style.opacity = "1";
    refKiss.current.style.transform =
      "translate(-50%, -50%) rotate(20deg) scale(1.3)";

    const timeoutAnimationKiss = setTimeout(() => {
      refKiss.current!.style.transition = "0.5s ease";
      refKiss.current!.style.transform =
        "translate(-50%, -50%) rotate(20deg) scale(1)";
    }, 1000);

    const timeoutResetPosition = setTimeout(() => {
      resetPositionPlayers();
      refKiss.current!.style.opacity = "0";
    }, 2200);

    const timeoutDispatchData = setTimeout(() => {
      const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
        calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

      elements[coordsCurrentPlayerDiv.indexPlayer].style.opacity = "1";
      elements[coordsSelectedPlayerDiv.indexPlayer].style.opacity = "1";

      dispatch(actionIncrementCountKiss());
      dispatch(actionChangeCurrentPlayer(selectedPlayer));
      dispatch(actionResetSelectedPlayer());
    }, 3400);

    return () => {
      clearTimeout(timeoutAnimationKiss);
      clearTimeout(timeoutResetPosition);
      clearTimeout(timeoutDispatchData);
    };
  }, [selectedPlayer, gameScript]);

  useEffect(() => {
    if (!selectedPlayer || gameScript !== "handshake" || !refHandshake.current)
      return;

    refHandshake.current.style.opacity = "1";
    refHandshake.current.style.transform =
      "translate(-50%, -50%) rotate(-20deg) scale(1.3)";

    const audio = new Audio("/sounds/handshake-sound.mp3");
    audio.play();

    const timeoutAnimationKiss = setTimeout(() => {
      refHandshake.current!.style.transition = "0.5s ease";
      refHandshake.current!.style.transform =
        "translate(-50%, -50%) rotate(-20deg) scale(1)";
    }, 1000);

    const timeoutResetPosition = setTimeout(() => {
      resetPositionPlayers();
      refHandshake.current!.style.opacity = "0";
    }, 2200);

    const timeoutDispatchData = setTimeout(() => {
      const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
        calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

      elements[coordsCurrentPlayerDiv.indexPlayer].style.opacity = "1";
      elements[coordsSelectedPlayerDiv.indexPlayer].style.opacity = "1";

      dispatch(actionIncrementCountHandshake());
      dispatch(actionChangeCurrentPlayer(selectedPlayer));
      dispatch(actionResetSelectedPlayer());
    }, 3400);

    return () => {
      clearTimeout(timeoutAnimationKiss);
      clearTimeout(timeoutResetPosition);
      clearTimeout(timeoutDispatchData);
    };
  }, [selectedPlayer, gameScript]);

  useEffect(() => {
    if (
      !selectedPlayer ||
      gameScript !== "reject" ||
      !refLeftHeart.current ||
      !refRightHeart.current
    )
      return;

    refLeftHeart.current.style.opacity = "1";
    refRightHeart.current.style.opacity = "1";

    const timeoutAnimationBrokenHeart = setTimeout(() => {
      const audio = new Audio("/sounds/tear-sound.mp3");
      audio.play();

      refLeftHeart.current!.style.transform =
        "translate(-120%, 20%) rotate(-45deg) scale(0.7)";

      refRightHeart.current!.style.transform =
        "translate(0%, 20%) rotate(45deg) scale(0.7)";
    }, 1400);

    const timeoutResetPosition = setTimeout(() => {
      resetPositionPlayers();
      refLeftHeart.current!.style.opacity = "0";
      refRightHeart.current!.style.opacity = "0";
    }, 2600);

    const timeoutDispatchData = setTimeout(() => {
      const { coordsCurrentPlayerDiv, coordsSelectedPlayerDiv } =
        calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer);

      elements[coordsCurrentPlayerDiv.indexPlayer].style.opacity = "1";
      elements[coordsSelectedPlayerDiv.indexPlayer].style.opacity = "1";

      dispatch(actionIncrementCountReject());
      dispatch(actionChangeCurrentPlayer(selectedPlayer));
      dispatch(actionResetSelectedPlayer());
    }, 3400);

    return () => {
      clearTimeout(timeoutAnimationBrokenHeart);
      clearTimeout(timeoutResetPosition);
      clearTimeout(timeoutDispatchData);
    };
  }, [selectedPlayer, gameScript]);

  if (selectedPlayer === null) return;

  return createPortal(
    <div ref={refContainer} className={style["container"]}>
      <>
        <div
          ref={refCurrentPlayer}
          className={`${propsClassName} ${style["circle-anim"]}`}
        >
          {isRenderPlayerDisplay && (
            <PlayerDisplay
              player={
                players[
                  calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer)
                    .coordsCurrentPlayerDiv.indexPlayer
                ]
              }
            />
          )}
        </div>

        <div
          ref={refSelectedPlayer}
          className={`${propsClassName} ${style["circle-anim"]}`}
        >
          {isRenderPlayerDisplay && (
            <PlayerDisplay
              player={
                players[
                  calculateCoordsFlyingPlayers(currentPlayer, selectedPlayer)
                    .coordsSelectedPlayerDiv.indexPlayer
                ]
              }
            />
          )}
        </div>
      </>

      {gameScript === "kiss" && (
        <div className={style["kiss"]}>
          <img ref={refKiss} src="/images/kiss.png" alt="kiss" />
        </div>
      )}
      {gameScript === "handshake" && (
        <div className={style["handshake"]}>
          <img
            ref={refHandshake}
            src="/images/handshake.png"
            alt="left-side-broken-heart"
          />
        </div>
      )}
      {gameScript === "reject" && (
        <div className={style["brokenHeart"]}>
          <img
            ref={refLeftHeart}
            className={style["brokenHeart-left"]}
            src="/images/left-side-broken-heart.png"
            alt="left-side-broken-heart"
          />
          <img
            ref={refRightHeart}
            className={style["brokenHeart-right"]}
            src="/images/right-side-broken-heart.png"
            alt="right-side-broken-heart"
          />
        </div>
      )}
    </div>,
    document.body
  );
};

export const AnimFlightPlayers = AnimFlightPlayersInitial;
