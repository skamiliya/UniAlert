import { AppReport } from "../../../types/report";
import ReportListItem from "./ReportListItem";

type Props = {
  report: AppReport[]
  selectReport: (report: AppReport) => void
  deleteReport: (reportId: string) => void
}


export default function ReportList({report, selectReport, deleteReport}: Props) {
  return (
    <>
    {report.map(report => (
      <ReportListItem
          key={report.id}
          report={report}
          selectReport={selectReport}
          deleteReport={deleteReport}/>
    ))}
    </>
  )
}
