import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
import ReportForm from '../form/ReportForm'
import { sampleData } from '../../../api/sampleData'
import { useEffect, useState } from 'react'
import { AppReport } from '../../../types/report'

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void
  selectReport: (report: AppReport | null) => void
  selectedReport: AppReport | null
}

export default function ReportDashboard({formOpen, setFormOpen, selectReport, selectedReport}: Props) {
  const [report, setReport] = useState<AppReport[]>([])

  useEffect(() => {
    setReport(sampleData);
  }, [])

  function addReport(report: AppReport){
    setReport(prevState => {
      return [...prevState, report]
    })
  }

  function updateReport(updatedReport: AppReport){
    setReport(report.map(rpt => rpt.id === updatedReport.id ? updatedReport : rpt));
    selectReport(null);
    setFormOpen(false);
  }

  function deleteReport(reportId: string){
    setReport(report.filter(rpt => rpt.id !== reportId));
  }

  return (
    <Grid>
        <Grid.Column width={10}>
            <ReportList report={report} selectReport={selectReport} deleteReport={deleteReport} />
        </Grid.Column>
        <Grid.Column width={6}>
          {formOpen && 
            <ReportForm
            setFormOpen={setFormOpen}
            updateReport={updateReport}
            addReport={addReport}
            selectedReport={selectedReport}
            key={selectedReport ? selectedReport.id : 'create'}/>}
        </Grid.Column>
    </Grid>
  )
}
