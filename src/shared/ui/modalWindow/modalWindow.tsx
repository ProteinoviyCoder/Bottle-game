import { createPortal } from "react-dom";
import style from "./modalWindow.module.scss";
import {
  type Dispatch,
  type FC,
  memo,
  type ReactNode,
  type SetStateAction,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Typography } from "../typography/typography";

type ModalWindowInitialProps = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  footer?: ReactNode;
};

const ModalWindowInitial: FC<ModalWindowInitialProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  style: ModalWindwoStyle,
  footer,
}) => {
  if (!isOpen) return null;

  const closeModalWindow = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return createPortal(
    <div
      className={style["modal-window-background"]}
      onMouseDown={closeModalWindow}
    >
      <div
        className={style["modal-window"]}
        onMouseDown={(e) => e.stopPropagation()}
        style={ModalWindwoStyle && { ...ModalWindwoStyle }}
      >
        <div className={style["modal_header"]}>
          {title && (
            <Typography textAlign="center" size="big" thickness="bold">
              {title}
            </Typography>
          )}
          {setIsOpen && (
            <span onClick={closeModalWindow} className={style["icon-btn"]}>
              <AiOutlineClose />
            </span>
          )}
        </div>
        <div className={style["modal-content"]}>{children}</div>
        {footer && <div className={style["modal-footer"]}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export const ModalWindow = memo(ModalWindowInitial);
