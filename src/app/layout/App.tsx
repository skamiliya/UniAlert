
import { Container } from "semantic-ui-react"
import ReportDashboard from "../features/reports/dashboard/ReportDashboard"
import NavBar from "./Nav/NavBar";
import { useState } from "react";


function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <NavBar setFormOpen={setFormOpen}/>
      <Container className="main">
        <ReportDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  )
}

export default App
