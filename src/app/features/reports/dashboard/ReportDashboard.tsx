import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
import ReportForm from '../form/ReportForm'
import { sampleData } from '../../../api/sampleData'
import { useEffect, useState } from 'react'
import { AppReport } from '../../../types/report'

export default function ReportDashboard() {
  const [report, setReport] = useState<AppReport[]>([])

  useEffect(() => {
    setReport(sampleData);
  }, [])

  return (
    <Grid>
        <Grid.Column width={10}>
            <ReportList report={report} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Filters</h2>
        </Grid.Column>
    </Grid>
  )
}
