import { AppReport } from "../../../types/report";
import ReportListItem from "./ReportListItem";

type Props = {
  reports: AppReport[]
}


export default function ReportList({reports}: Props) {
  return (
    <>
    {reports.map(reports => (
      <ReportListItem
          key={reports.id}
          report={reports}/>
    ))}
    </>
  )
}