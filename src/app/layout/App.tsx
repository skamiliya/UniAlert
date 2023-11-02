
import { Container } from "semantic-ui-react"
import ReportDashboard from "../features/reports/dashboard/ReportDashboard"
import NavBar from "./Nav/NavBar"


function App() {

  return (
  <>
 <NavBar/>
<Container className="main">
<ReportDashboard/>
</Container>
</>
  )
}

export default App
