import {BrowserRouter as Router} from "react-router-dom";
//Routes
import AppRoutes from "./components/Routes/AppRoutes";
//components
import HeaderComponent from "./components/Header/HeaderComponent";
import FooterComponent from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <main className="flex flex-col px-0 items-center overflow-x-hidden min-h-screen w-full">
      <HeaderComponent />
      <AppRoutes />
      <FooterComponent />
      </main>
    </Router>
  )
}

export default App;
