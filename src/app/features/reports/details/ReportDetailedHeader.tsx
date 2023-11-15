import { Segment, Item, Header, Button, Image } from "semantic-ui-react";

export default function ReportDetailedHeader() {
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
                <Image src={`/categoryImages/lostphone.jpg`} fluid style={reportImageStyle} />

                <Segment basic style={reportImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content='Report Title'
                                    style={{ color: 'white' }}
                                />
                                <p> Report Date </p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">SEE THIS REPORT</Button>

                <Button color="orange" floated="right">
                    Manage Report
                </Button>
            </Segment>
        </Segment.Group>
    )
}
