import { FC, PropsWithChildren, useMemo } from "react";

interface Props extends PropsWithChildren {
  cardClass?: string;
}

export const AppMovieCard: FC<Props> = ({ children, cardClass }) => {
  const customCard = useMemo(() => {
    return [
      cardClass,
      "card basis-[220px] w-[220px] border border-[#f5f5f1] rounded-2xl",
    ].join(" ");
  }, [cardClass]);

  return <div className={customCard}>{children}</div>;
};
