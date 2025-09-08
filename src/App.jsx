import {BrowserRouter as Router} from "react-router-dom";
//Routes
import AppRoutes from "./components/Routes/AppRoutes";
//components
import HeaderComponent from "./components/Header/HeaderComponent";

function App() {
  return (
    <Router>
      <main className="flex flex-col min-h-full min-w-full items-center overflow-x-hidden h-full w-full">
      <HeaderComponent />
      <AppRoutes />
      </main>
    </Router>
  )
}

export default App;
