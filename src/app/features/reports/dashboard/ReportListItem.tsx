import {
  Button,
  Icon,
  Item,
  ItemDescription,
  ItemGroup,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import ReportListUser from "./ReportListUser";
import { AppReport } from "../../../types/report";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

type Props = {
  report: AppReport;
};

export default function ReportListItem({ report }: Props) {
  const [loading, setLoading] = useState(false);

  async function removeReport() {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'reports', report.id))
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={report.hostPhotoURL || "/categoryImages/user.png"}
            />
            <Item.Content>
              <Item.Header>{report.title}</Item.Header>
              <ItemDescription>Created by {report.createBy}</ItemDescription>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {report.date}
          <Icon name="map marker alternate" /> {report.place}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal={true}>
          {report.users.map(user => (
            <ReportListUser key={user.id} user={user} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{report.description}</span>
        <Button
          loading={loading}
          onClick={removeReport}
          animated
          color="red"
          floated="right"
        >
          <Button.Content visible>Delete </Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>

        <Button
          as={Link}
          to={`/reports/${report.id}`}
          animated
          color="green"
          floated="right"
        >
          <Button.Content visible>View Map</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Segment>
    </SegmentGroup>
  );
}
