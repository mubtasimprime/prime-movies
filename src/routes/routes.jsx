import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
