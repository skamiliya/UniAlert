
import { Container } from "semantic-ui-react"
import NavBar from "./Nav/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/reports/home/HomePage";
import ModalManager from "../common/modals/ModalManager";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <ModalManager />
          <NavBar />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default App
