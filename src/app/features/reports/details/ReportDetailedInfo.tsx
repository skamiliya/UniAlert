import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { AppReport } from "../../../types/report";

type Props ={
    report: AppReport
}

export default function ReportDetailedInfo({report}: Props) {
  return (
    
<Segment.Group>
    <Segment attached="top">
        <Grid>
            <Grid.Column width={1}>
                <Icon size="large" color="teal" name="info"/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{report.description}</p>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign="middle">
            <Grid.Column width={1}>
                <Icon name="calendar" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={15}>
                <span>{report.date}</span>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign="middle">
            <Grid.Column width={1}>
                <Icon name="marker" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={11}>
                <span>{report.place}</span>
            </Grid.Column>
            <Grid.Column width={4}>
                <Button color="teal" size="tiny" content="Show Map"/>
            </Grid.Column>
        </Grid>
    </Segment>
</Segment.Group>
  )
}
