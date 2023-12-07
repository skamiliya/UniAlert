import { Button, Icon, Item, ItemDescription, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
import ReportListUser from "./ReportListUser";
import { AppReport } from "../../../types/report";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type Props = {
  report: AppReport;
};

export default function ReportListItem({ report }: Props) {

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
              {report.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This report has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(new Date(report.date), 'dd MMM yyyy, h:mm a')}
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
          as={Link}
          to={`/reports/${report.id}`}
          animated
          color="green"
          floated="right"
        >
          <Button.Content visible>View</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Segment>
    </SegmentGroup>
  );
}
