import InfiniteScroll from "react-infinite-scroller";
import { AppReport } from "../../../types/report";
import ReportListItem from "./ReportListItem";

type Props = {
  reports: AppReport[]
  loadMore: () => void
  hasMore: boolean
  loading: boolean
}


export default function ReportList({ reports, hasMore, loadMore, loading }: Props) {
  return (
    <>
      {reports.length !== 0 && (
        < InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          initialLoad={false}
        >
          {
            reports.map(reports => (
              <ReportListItem
                key={reports.id}
                report={reports} />
            ))}
        </InfiniteScroll>
      )}
    </>
  )
}