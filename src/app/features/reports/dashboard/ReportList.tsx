import { AppReport } from "../../../types/report";
import ReportListItem from "./ReportListItem";

type Props = {
  report: AppReport[]
}


export default function ReportList({report}: Props) {
  return (
    <>
    {report.map(report => (
      <ReportListItem key={report.id} report={report} />
    ))}
    </>
  )
}
