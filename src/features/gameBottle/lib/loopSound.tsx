export const loopSound = (
  startTime: number,
  timing: number,
  audio: HTMLAudioElement
) => {
  const onePercentOfTiming = timing / 100;
  const seventyPercentOfTiming = onePercentOfTiming * 60;

  const handlerAudio = () => {
    const timeDifference = Date.now() - startTime;

    if (timeDifference > timing) {
      audio.removeEventListener("ended", handlerAudio);
      return;
    }

    if (timeDifference >= seventyPercentOfTiming) {
      setTimeout(() => {
        audio.play();
      }, 100);
      return;
    }

    audio.play();
  };

  audio.addEventListener("ended", handlerAudio);
  audio.play();
};
