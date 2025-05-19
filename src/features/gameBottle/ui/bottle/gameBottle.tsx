import { actionChangeSelectedPlayer } from "../../../../entities/player/model/playersSliceStore";
import type { Player } from "../../../../entities/player/model/types";
import { useAppDispatch } from "../../../../shared/hooks/redux/useAppDispatch";
import { useAppSelector } from "../../../../shared/hooks/redux/useAppSelector";
import { getRandomNumber } from "../../../../shared/lib/getRandomNumber";
import { actionSetGameScript } from "../../../../shared/model/gameScriptSlice";
import { Button } from "../../../../shared/ui/button/button";
import { ModalWindow } from "../../../../shared/ui/modalWindow/modalWindow";
import { Typography } from "../../../../shared/ui/typography/typography";
import { rotateBottle } from "../../lib/rotateBottle";
import style from "./gameBottle.module.scss";
import { useEffect, useRef, useState, type FC } from "react";

type GameBottleInitialProps = {
  players: Player[];
};

const GameBottleInitial: FC<GameBottleInitialProps> = ({ players }) => {
  const dispatch = useAppDispatch();
  const currentPlayer = useAppSelector((state) => state.players.currentPlayer);

  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [isRenderBtn, setIsRenderBtn] = useState<boolean>(true);
  const [isOpenModalWidow, setIsOpenModalWindow] = useState(false);
  const [valueTimer, setValueTimer] = useState<number | null>(null);
  const [audioTimer] = useState<HTMLAudioElement>(
    new Audio("./sounds/click-sound.mp3")
  );

  const refIsGameRuning = useRef(false);
  const refRandomNumber = useRef(-1);
  const refBottle = useRef<HTMLImageElement | null>(null);

  const getImage = () => {
    let imgSrc: string;
    if (
      refRandomNumber.current > -1 &&
      players[refRandomNumber.current].role === "user"
    ) {
      const indexCurrentPlayer = players.findIndex(
        (player) => player.id === currentPlayer
      );
      imgSrc = players[indexCurrentPlayer].img;
    } else if (refRandomNumber.current > -1) {
      imgSrc = players[refRandomNumber.current].img;
    } else {
      imgSrc = "";
    }

    return imgSrc;
  };

  const dispatchChosenGameScript = (
    script: "kiss" | "handshake" | "reject"
  ) => {
    dispatch(actionSetGameScript(script));
    dispatch(actionChangeSelectedPlayer(players[refRandomNumber.current].id));
    refIsGameRuning.current = false;
    refRandomNumber.current = -1;
    setIsOpenModalWindow(false);
  };

  const dispatchRandomGameScript = () => {
    const randomNumberScript = getRandomNumber(1, 3);
    const nameGameScript =
      randomNumberScript === 1
        ? "kiss"
        : randomNumberScript === 2
        ? "handshake"
        : "reject";

    dispatch(actionSetGameScript(nameGameScript));
  };

  const playMove = (timing: number): void => {
    const playerIndex = players.findIndex(
      (player) => player.id === currentPlayer
    );

    let randomNumber = getRandomNumber(0, 9);

    while (randomNumber === playerIndex) {
      randomNumber = getRandomNumber(0, 9);
    }

    const deg = rotateBottle(
      refBottle.current!,
      10,
      randomNumber,
      currentAngle,
      90,
      timing
    );
    setCurrentAngle(deg);

    refRandomNumber.current = randomNumber;

    setTimeout(() => {
      if (
        players[playerIndex].role === "bot" &&
        players[randomNumber].role === "bot"
      ) {
        dispatchRandomGameScript();
        dispatch(actionChangeSelectedPlayer(players[randomNumber].id));
        refIsGameRuning.current = false;
      } else {
        setIsOpenModalWindow(true);
      }
    }, timing);
  };

  useEffect(() => {
    const playerIndex = players.findIndex(
      (player) => player.id === currentPlayer
    );

    if (playerIndex === -1) return;
    if (players[playerIndex].role === "user") {
      setIsRenderBtn(true);
      return;
    }

    setIsRenderBtn(false);

    if (!refIsGameRuning.current) {
      setValueTimer(3);
      audioTimer.play();
      refIsGameRuning.current = true;
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (valueTimer === null) return;

    if (valueTimer === 0) {
      setValueTimer(null);
      playMove(4000);
      return;
    }

    const timeout = setTimeout(() => {
      if (valueTimer >= 2) {
        audioTimer.play();
      }
      setValueTimer((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [valueTimer]);

  return (
    <div className={style["container-bottle"]}>
      <img ref={refBottle} src="./images/bottle.png" alt="bottle" />
      {isRenderBtn && (
        <button
          className={style["spin-btn"]}
          onClick={() => {
            audioTimer.play();
            setValueTimer(3);
            setIsRenderBtn(false);
          }}
        >
          Крутить
        </button>
      )}
      {valueTimer !== null && (
        <Typography
          className={style["timer"]}
          textAlign="center"
          thickness="bold"
          size="big"
        >
          {valueTimer.toString()}...
        </Typography>
      )}

      <ModalWindow
        style={{ width: "70%", maxWidth: "400px" }}
        title="Что вы хотите от?"
        isOpen={isOpenModalWidow}
      >
        <div className={style["container-modal-avatar"]}>
          <img
            className={style["modal-avatar"]}
            src={getImage()}
            alt="avatar"
          />
        </div>
        <div className={style["container-buttons"]}>
          <Button
            onClick={() => dispatchChosenGameScript("kiss")}
            title="Поцелуй"
            variant="kiss"
          >
            Поцелуй
            <img
              className={style["img-icon-kiss"]}
              src="./images/kiss.png"
              alt="kiss"
            />
          </Button>
          <Button
            onClick={() => dispatchChosenGameScript("handshake")}
            title="Пожать руку"
            variant="handshake"
          >
            Пожать руку
            <img
              className={style["img-icon-handshake"]}
              src="./images/handshake.png"
              alt="kiss"
            />
          </Button>
          <Button
            onClick={() => dispatchChosenGameScript("reject")}
            title="Ничего"
            variant="reject"
          >
            Ничего
            <div className={style["containerimg-icon-broken-heart"]}>
              <img
                className={style["img-icon-broken-heart"]}
                src="./images/left-side-broken-heart.png"
                alt="kiss"
              />
              <img
                className={style["img-icon-broken-heart"]}
                src="./images/right-side-broken-heart.png"
                alt="kiss"
              />
            </div>
          </Button>
        </div>
      </ModalWindow>
    </div>
  );
};

export const GameBottle = GameBottleInitial;
