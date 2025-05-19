import type { FC, ReactNode } from "react";
import { RouterProvider, StoreProvider } from "./providersList";

type RootProviderInitialProps = {
  children: ReactNode;
};

const RootProviderInitial: FC<RootProviderInitialProps> = ({ children }) => {
  return (
    <StoreProvider>
      <RouterProvider>{children}</RouterProvider>
    </StoreProvider>
  );
};

export const RootProvider = RootProviderInitial;
