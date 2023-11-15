
import { Container } from "semantic-ui-react"
import ReportDashboard from "../features/reports/dashboard/ReportDashboard"
import NavBar from "./nav/NavBar";
import { useState } from "react";
import { AppReport } from "../types/report";


function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<AppReport | null>(null);

  function handleSelectReport(report: AppReport | null){
    setSelectedReport(report);
    setFormOpen(true);
  }

  function handleCreateFormOpen(){
    setSelectedReport(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen}/>
      <Container className="main">
        <ReportDashboard
        formOpen={formOpen}
        setFormOpen={setFormOpen} 
        selectedReport={selectedReport}
        selectReport={handleSelectReport}/>
      </Container>
    </>
  )
}

export default App
