
import { Container } from "semantic-ui-react"
import NavBar from "./Nav/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/reports/home/HomePage";
import ModalManager from "../common/modals/ModalManager";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { logout, signIn } from "../features/auth/authSlice";
import { auth } from "../config/firebase";


function App() {
  const location = useLocation();
  const dispath = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: user => {
        if (user) {
          dispath(signIn(user))
        } else {
          dispath(logout())
        }
      },
      error: error => console.log(error),
      complete: () => {}
    })
  }, [dispath])
  
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
