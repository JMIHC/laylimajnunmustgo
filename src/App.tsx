import { createBrowserRouter, RouterProvider } from "react-router";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { MapPage } from "./routes/MapPage";
import { RolePage } from "./routes/RolePage";

const router = createBrowserRouter([
  { path: "/login", Component: Login },
  {
    Component: RequireAuth,
    children: [
      { path: "/", Component: Home },
      { path: "/role/:slug", Component: RolePage },
      { path: "/map", Component: MapPage },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
