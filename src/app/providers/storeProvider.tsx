import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

type StoreProviderInitialProps = {
  children: ReactNode;
};

const StoreProviderInitial: FC<StoreProviderInitialProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const StoreProvider = StoreProviderInitial;
