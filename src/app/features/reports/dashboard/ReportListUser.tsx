import { List, Image } from "semantic-ui-react";
import { User } from "../../../types/report";

type Props = {
user: User
}

export default function ReportListUser({user}: Props) {
  return (
    <List.Item>
    <Image size='mini' circular src={user.photoURL} />
    </List.Item>
  )
}
