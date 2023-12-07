import { Grid } from 'semantic-ui-react'
import ReportDetailedInfo from './ReportDetailedInfo'
import ReportDetailedHeader from './ReportDetailedHeader'
import ReportDetailedChat from './ReportDetailedChat'
import ReportDetailedSidebar from './ReportDetailedSidebar'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../store/store'
import { useEffect } from 'react'
import { actions } from '../reportSlice'
import LoadingComponent from '../../../layout/LoadingComponent'
import { useFirestore } from '../../../hooks/firestore/useFirestore'

export default function ReportDetailedPage() {
  const { id } = useParams();
  const report = useAppSelector(state => state.reports.data.find(rpt => rpt.id === id));
  const { status } = useAppSelector(state => state.reports);
  const { loadDocument } = useFirestore('reports');

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions)
  }, [id, loadDocument])

  if (status === 'loading') return <LoadingComponent />

  if (!report) return <h2>Report not Found!</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ReportDetailedHeader report={report} />
        <ReportDetailedInfo report={report} />
        <ReportDetailedChat reportId={report.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ReportDetailedSidebar report={report} />
      </Grid.Column>
    </Grid>
  )
}
