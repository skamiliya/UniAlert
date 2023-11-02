import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
export default function ReportDashboard() {
  return (
    <Grid>
        <Grid.Column width={10}>
            <ReportList/>
        </Grid.Column>
        <Grid.Column width={6}>
            <h2>Right Column</h2>
        </Grid.Column>
    </Grid>
  )
}
