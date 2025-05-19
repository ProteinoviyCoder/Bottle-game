type calculateCircleCoordsReturn = {
  coordX: number;
  coordY: number;
  angle: number;
};

type calculateCircleCoordsFunc = (
  indexCircleChildElement: number,
  widthCircleChildElement: number
) => calculateCircleCoordsReturn;

export const calculateCircleCoords: calculateCircleCoordsFunc = (
  indexCircleChildElement,
  partsOfCircle
) => {
  const angle = ((Math.PI * 2) / partsOfCircle) * indexCircleChildElement;

  const coordX = 50 + 50 * Math.cos(angle);
  const coordY = 50 + 50 * Math.sin(angle);

  const angleInDegrees = angle * (180 / Math.PI);

  return {
    coordX,
    coordY,
    angle: angleInDegrees,
  };
};
