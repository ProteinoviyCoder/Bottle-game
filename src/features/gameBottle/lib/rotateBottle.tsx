import { loopSound } from "./loopSound";

export const rotateBottle = (
  elem: HTMLElement,
  partsOfCircle: number,
  indexSelectedParts: number,
  currentAngle: number,
  extarDeg: number = 90,
  timing: number
) => {
  const prevDeg = currentAngle - (currentAngle % 360);

  const angle = ((Math.PI * 2) / partsOfCircle) * indexSelectedParts;
  const angleInDegrees = angle * (180 / Math.PI);
  const extraScrolls = 360 * 6;

  const totalAngle = extarDeg
    ? angleInDegrees + extraScrolls + extarDeg + prevDeg
    : angleInDegrees + extraScrolls + prevDeg;

  const audio = new Audio("./sounds/rotate-sound.mp3");

  loopSound(Date.now(), timing, audio);

  elem.style.transform = `rotate(${totalAngle}deg)`;

  return totalAngle;
};
