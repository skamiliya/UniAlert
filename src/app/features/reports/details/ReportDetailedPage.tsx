import { Grid } from 'semantic-ui-react'
import ReportDetailedInfo from './ReportDetailedInfo'
import ReportDetailedHeader from './ReportDetailedHeader'
import ReportDetailedChat from './ReportDetailedChat'
import ReportDetailedSidebar from './ReportDetailedSidebar'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { setReports } from '../reportSlice'
import { toast } from 'react-toastify'
import LoadingComponent from '../../../layout/LoadingComponent'

export default function ReportDetailedPage() {
  const {id} = useParams();
  const report = useAppSelector(state => state.reports.reports.find(rpt=>rpt.id === id));
  const dispatch = useAppDispatch();
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    if(!id) return;
    const unsubscribe = onSnapshot(doc(db, 'report', id), {
      next : doc =>{
        dispatch(setReports({id:doc.id,...doc.data()}))
        setLoading(false);
      }, 
      error : err =>{
        console.log(err)
        toast.error(err.message)
        setLoading(false)
      }
    })
    return ()=> unsubscribe()
  }, [id, dispatch]);
  if (loading) return <LoadingComponent/>

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
