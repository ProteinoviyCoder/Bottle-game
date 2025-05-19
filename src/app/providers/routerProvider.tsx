import type { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router";

type RouterProviderInitialProps = {
  children: ReactNode;
};

const RouterProviderInitial: FC<RouterProviderInitialProps> = ({
  children,
}) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export const RouterProvider = RouterProviderInitial;
