import {BrowserRouter as Router} from "react-router-dom";

//Routes
import AppRoutes from "./components/Routes/AppRoutes";

//components
import HeaderComponent from "./components/Header/HeaderComponent";

function App() {
  return (
    <Router>
      <main>
      <HeaderComponent />
      <AppRoutes />
      </main>
    </Router>
  )
}

export default App;
