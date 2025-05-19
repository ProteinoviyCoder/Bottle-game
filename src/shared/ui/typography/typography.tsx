import type { FC, ReactNode } from "react";
import style from "./typography.module.scss";

type TypographyInitialProps = {
  size: "small" | "medium" | "big";
  type?: "text" | "title";
  thickness?: "standart" | "bold";
  textAlign?: "start" | "center" | "end";
  className?: string;
  children: ReactNode;
  title?: string;
};

const TypographyInitial: FC<TypographyInitialProps> = ({
  size,
  type = "text",
  thickness = "standart",
  textAlign: myTextAlign = "start",
  children,
  className: classNameProps,
  title,
}) => {
  if (type === "title") {
    return (
      <h2
        className={`${style["title"]} ${style[thickness]} ${
          style[`title-${size}`]
        } ${classNameProps}`}
        style={{ textAlign: myTextAlign }}
        title={title}
      >
        {children}
      </h2>
    );
  }

  return (
    <p
      className={`${style["text"]} ${style[thickness]} ${
        style[`text-${size}`]
      } ${classNameProps}`}
      style={{ textAlign: myTextAlign }}
      title={title}
    >
      {children}
    </p>
  );
};

export const Typography = TypographyInitial;
