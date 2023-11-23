import { Grid } from 'semantic-ui-react'
import ReportDetailedInfo from './ReportDetailedInfo'
import ReportDetailedHeader from './ReportDetailedHeader'
import ReportDetailedChat from './ReportDetailedChat'
import ReportDetailedSidebar from './ReportDetailedSidebar'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/store'

export default function ReportDetailedPage() {
  const {id} = useParams();
  const report = useAppSelector(state => state.reports.reports.find(rpt=>rpt.id === id));
  
  if(!report) return <h2>Report not Found!</h2>
  
  return (
    <Grid>
      <Grid.Column width={10}>
        <ReportDetailedHeader report = {report}/>
        <ReportDetailedInfo  report = {report}/>
        <ReportDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ReportDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
