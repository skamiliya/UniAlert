import {Grid} from 'semantic-ui-react'
import ReportList from './ReportList'
import { useAppSelector } from '../../../store/store'

export default function ReportDashboard() {
  const {reports} = useAppSelector(state => state.reports)



  return (
    <Grid>
        <Grid.Column width={10}>
            <ReportList reports={reports} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Filters</h2>
        </Grid.Column>
    </Grid>
  )
}
