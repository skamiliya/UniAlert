import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppReport } from "../../../types/report";

type Props ={
    report: AppReport
}

export default function ReportDetailedHeader({report}: Props) {
const reportImageStyle = {
    filter: 'brightness(30%)'
}

const reportImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    coloe: 'white',
}

    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/categoryImages/${report.category}.jpg`} fluid style={reportImageStyle} />

                <Segment basic style={reportImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={report.title}
                                    style={{ color: 'white' }}
                                />
                                <p> {report.date} </p>
                                <p>
                                    {report.createBy} <strong></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel Report</Button>
                <Button color="teal">SEE THIS REPORT</Button>
                <Button as ={Link} to ={`/manage/${report.id}`} color="orange" floated="right">
                    Manage Report
                </Button>
            </Segment>
        </Segment.Group>
    )
}
