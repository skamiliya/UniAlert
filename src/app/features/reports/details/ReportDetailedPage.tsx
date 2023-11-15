import { Grid } from 'semantic-ui-react'
import ReportDetailedInfo from './ReportDetailedInfo'
import ReportDetailedHeader from './ReportDetailedHeader'
import ReportDetailedChat from './ReportDetailedChat'
import ReportDetailedSidebar from './ReportDetailedSidebar'

export default function ReportDetailedPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ReportDetailedHeader />
        <ReportDetailedInfo />
        <ReportDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ReportDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
