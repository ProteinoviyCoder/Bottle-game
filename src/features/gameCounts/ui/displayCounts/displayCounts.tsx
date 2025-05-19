import { createPortal } from "react-dom";
import { CountHandshake } from "../countHandshake/countHandshake";
import style from "./displayCounts.module.scss";
import type { FC } from "react";
import { CountKiss } from "../countKiss/countKiss";
import { CountReject } from "../countReject/countReject";

const DisplayCountsInitial: FC = () => {
  return createPortal(
    <div className={style["container-counts"]}>
      <CountKiss />
      <CountHandshake />
      <CountReject />
    </div>,
    document.body
  );
};

export const DisplayCounts = DisplayCountsInitial;
