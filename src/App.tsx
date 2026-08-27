import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./routes/Home";
import { RolePage } from "./routes/RolePage";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/role/:slug", Component: RolePage },
]);

export function App() {
  return <RouterProvider router={router} />;
}
