import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ThoughtsDetailsPage from "../pages/thoughts/details";
import ThoughtsHomePage from "../pages/thoughts/home";
import paths from "../router/paths";

const router = createBrowserRouter([
  { path: paths.root, element: <HomePage /> },
  {
    path: paths.thoughts.root,
    children: [
      { index: true, element: <ThoughtsHomePage /> },
      { path: ":id", element: <ThoughtsDetailsPage /> },
    ],
  },
]);

export default router;
