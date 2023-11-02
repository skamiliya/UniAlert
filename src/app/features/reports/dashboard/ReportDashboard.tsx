import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
import ReportForm from '../form/ReportForm'
import { sampleData } from '../../../api/sampleData'

export default function ReportDashboard() {
  return (
    <Grid>
        <Grid.Column width={10}>
            <ReportList report={sampleData} />
        </Grid.Column>
        <Grid.Column width={6}>
            <ReportForm />
        </Grid.Column>
    </Grid>
  )
}
