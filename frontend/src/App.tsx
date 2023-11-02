import { RouterProvider } from "react-router-dom";
import router from "./Rroutes/Route";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  )
}

export default App;