import { RouterProvider } from "react-router";
import { useAuthListener } from "./hooks/useAuthListener";
import { router } from "./routes";

const App = () => {
  useAuthListener();

  return <RouterProvider router={router} />;
};

export default App;
