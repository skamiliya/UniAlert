import { Grid } from 'semantic-ui-react';
import ReportList from './ReportList';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useState } from 'react';
import { QuerySnapshot, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { AppReport } from '../../../types/report';
import { setReports } from '../reportSlice';
import LoadingComponent from '../../../layout/LoadingComponent';

export default function ReportDashboard() {
  const { reports } = useAppSelector(state => state.reports);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, {
      next: QuerySnapshot => {
        const rpt: AppReport[] = [];
        QuerySnapshot.forEach(doc => {
          rpt.push({ id:  doc.id, ...doc.data()} as AppReport );
        });
        dispatch(setReports(rpt));
        setLoading(false);
        
      },
      error: err => {
        console.error(err);
        setLoading(false);
      },
      complete: () => console.log('This will not be reached')
    });
    return () => unsubscribe();
  }, [dispatch]);

if (loading) return <LoadingComponent/>

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
