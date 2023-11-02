import { Button, Icon, Item, ItemDescription, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react";
import ReportListAttendee from "./ReportListAttendee";
import { AppReport } from "../../../types/report";

type Props = {
    report: AppReport
}

export default function ReportListItem({report}: Props) {
  return (
    <SegmentGroup>
        <Segment>
            <ItemGroup>
                <Item>
                    <Item.Image size="tiny" circular src ={report.hostPhotoURL} />
                    <Item.Content>
                        <Item.Header>{report.title}</Item.Header>
                        <ItemDescription>
                            Hosted by {report.hostedBy}
                        </ItemDescription>
                    </Item.Content>

                </Item>
            </ItemGroup>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock'/> {report.date}
                <Icon name='map marker alternate'/> {report.venue}
            </span>
        </Segment>
        <Segment secondary>
            <List Horizontal>
                <ReportListAttendee />
                {report.attendees.map((attendee: any) => (
                    <ReportListAttendee attendee={attendee} />
                ))}
            </List>
        </Segment>
        <Segment clearing>
            <span>
                {report.description}
            </span>
            <Button color='green' floated="right" content="View Map" />
        </Segment>
    </SegmentGroup>
  )
}
