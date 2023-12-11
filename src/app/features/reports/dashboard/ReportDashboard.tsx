import { Grid } from 'semantic-ui-react';
import ReportList from './ReportList';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { actions } from '../reportSlice';
import { useFirestore } from '../../../hooks/firestore/useFirestore';
import { useCallback, useEffect, useState } from 'react';
import ReportFilter from './ReportFilter';
import { QueryOptions } from '../../../hooks/firestore/type';
import ReportListItemPlaceholder from './ReportListItemPlaceholder';

export default function ReportDashboard() {
  const dispatch = useAppDispatch();
  const { data: reports, status, loadedInitial } = useAppSelector(state => state.reports);
  const { loadCollection, hasMore } = useFirestore('reports');
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'date', operator: '>=', value: new Date() }
  ])

  const loadReports = useCallback(async (reset?: boolean) => {
    loadCollection(actions, {
      queries: query,
      limit: 2,
      sort: { attribute: 'date', order: 'asc' },
      pagination: true,
      reset,
      get: true
    })
  }, [loadCollection, query])

  useEffect(() => {
    loadReports(true);

    return () => {
      dispatch(actions.reset());
    }
  }, [loadReports, dispatch])

  function loadMore() {
    loadReports();
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {!loadedInitial ? (
          <>
            <ReportListItemPlaceholder />
            <ReportListItemPlaceholder />
          </>
        ) : (
          <>
                <ReportList
                reports = { reports }
                hasMore={hasMore.current}
                loadMore={loadMore}
                loading={status === 'loading'}
              />
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <div className='ui fixed top sticky' style={{ top: 98, width: 405, zIndex: 1 }}>
          <ReportFilter setQuery={setQuery} />
        </div>
      </Grid.Column>
    </Grid>
  )
}