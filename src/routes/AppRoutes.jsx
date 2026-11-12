import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Login from "../pages/login/Login";
import RouteSkeleton from "./skeletons/RouteSkeleton";
import RouteTransition from "./RouteTransition";

function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <RouteTransition>
              <Login />
            </RouteTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
