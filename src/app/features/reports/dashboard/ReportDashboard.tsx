import { Grid, Sticky } from 'semantic-ui-react';
import ReportList from './ReportList';
import { useAppSelector } from '../../../store/store';
import { actions } from '../reportSlice';
import { useFirestore } from '../../../hooks/firestore/useFirestore';
import { useEffect, useRef, useState } from 'react';
import ReportFilter from './ReportFilter';
import { QueryOptions } from '../../../hooks/firestore/type';
import ReportListItemPlaceholder from './ReportListItemPlaceholder';

export default function ReportDashboard() {
  const contextRef= useRef(null)
  const {data: reports, status} = useAppSelector(state => state.reports);
  const {loadCollection} = useFirestore('reports');
  const [query, setQuery] = useState<QueryOptions[]>([
    {attribute:'date', operator:'>=',value:new Date()}
  ])

  useEffect(() => {
    loadCollection(actions,{
      queries:query
    })
  }, [loadCollection, query]);

 

  return (
    <Grid>
      <Grid.Column width={10} ref={contextRef} >
        {status==='loading'?(
          <>
          <ReportListItemPlaceholder/>
          <ReportListItemPlaceholder/>
          </>
        ):(
          <ReportList reports={reports}/>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <Sticky context = {contextRef.current} offset={55} >
        <ReportFilter setQuery={setQuery}/>
        </Sticky>
     
      </Grid.Column>
    </Grid>
  );
}
