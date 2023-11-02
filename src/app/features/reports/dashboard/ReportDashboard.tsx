import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
import ReportForm from '../form/ReportForm'
import { sampleData } from '../../../api/sampleData'
import { useEffect, useState } from 'react'
import { AppReport } from '../../../types/report'

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void
}

export default function ReportDashboard({formOpen, setFormOpen}: Props) {
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
          {formOpen && 
            <ReportForm setFormOpen={setFormOpen} />}
        </Grid.Column>
    </Grid>
  )
}
