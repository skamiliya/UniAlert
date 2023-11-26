import { Grid } from 'semantic-ui-react';
import ReportList from './ReportList';
import { useAppSelector } from '../../../store/store';
import LoadingComponent from '../../../layout/LoadingComponent';
import { actions } from '../reportSlice';
import { useFirestore } from '../../../hooks/firestore/useFirestore';
import { useEffect } from 'react';

export default function ReportDashboard() {
  const {data: reports, status} = useAppSelector(state => state.reports);
  const {loadCollection} = useFirestore('reports');

  useEffect(() => {
    loadCollection(actions)
  }, [loadCollection]);

  if (status === 'loading') return <LoadingComponent />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ReportList reports={reports} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
