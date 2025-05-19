import style from "./playerName.module.scss";
import { memo, type FC } from "react";
import { Typography } from "../../../../shared/ui/typography/typography";

type PlayerNameInitialProps = {
  name: string;
};

const PlayerNameInitial: FC<PlayerNameInitialProps> = ({ name }) => {
  return (
    <Typography
      className={style["player-name"]}
      textAlign="center"
      size="medium"
      title={name}
    >
      {name}
    </Typography>
  );
};

export const PlayerName = memo(PlayerNameInitial);
