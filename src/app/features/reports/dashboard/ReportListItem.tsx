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

type Props = {
  report: AppReport;
  selectReport: (report: AppReport) => void;
  deleteReport: (reportId: string) => void;
};

export default function ReportListItem({ report, selectReport, deleteReport }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={report.hostPhotoURL || '/user.png'} />
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
        <List horizontal = {true}>
          {report.users.map((user: any) => (
            <ReportListUser key={user.id} user={user} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{report.description}</span>
        <Button animated color="red" floated ="right" onClick={() => deleteReport(report.id)}> 
          <Button.Content visible>Delete</Button.Content>
          <Button.Content hidden >
            <Icon name="arrow right"/>
          </Button.Content>
        </Button>

        <Button animated color="green" floated ="right" onClick={() => selectReport(report)}> 
          <Button.Content visible>View Map</Button.Content>
          <Button.Content hidden >
            <Icon name="arrow right"/>
          </Button.Content>
        </Button>
      </Segment>
    </SegmentGroup>
  );
}
