import { List, Image } from "semantic-ui-react";
import { User } from "../../../types/report";
import { Link } from "react-router-dom";

type Props = {
user: User
}

export default function ReportListUser({user}: Props) {
  return (
    <List.Item as = {Link} to = {`/profiles/${user.id}`} >
    <Image size='mini' circular src={user.photoURL} />
    </List.Item>
  )
}
