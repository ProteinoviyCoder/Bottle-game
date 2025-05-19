import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

const GamePage = lazy(() => import("../../pages/gamePage/gamePage"));
import { GamePageSkeleton } from "../../pages/gamePage/gamePageSkeleton";

const MyRouterInitial = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<GamePageSkeleton />}>
            <GamePage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export const MyRouter = MyRouterInitial;
