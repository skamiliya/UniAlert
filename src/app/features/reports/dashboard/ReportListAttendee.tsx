import { List, Image } from "semantic-ui-react";
import { Attendee } from "../../../types/report";

type Props = {
attendee: Attendee
}

export default function ReportListAttendee({attendee}: Props) {
  return (
    <List.Item>
    <Image size='mini' circular src='/user.png' />
    </List.Item>
  )
}
