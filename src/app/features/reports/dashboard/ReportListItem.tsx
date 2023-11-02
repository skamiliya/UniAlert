import { Button, Icon, Item, ItemDescription, ItemGroup, Segment, SegmentGroup } from "semantic-ui-react";


export default function ReportListItem() {
  return (
    <SegmentGroup>
        <Segment>
            <ItemGroup>
                <Item>
                    <Item.Image size="tiny" circular src ='/user.png'/>
                    <Item.Content>
                        <Item.Header>Report</Item.Header>
                        <ItemDescription>
                            Reported by Anonym
                        </ItemDescription>
                    </Item.Content>

                </Item>
            </ItemGroup>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock'/> Date
                <Icon name='map marker alternate icon'/> Place
            </span>
        </Segment>
        <Segment clearing>
            <span>
                Description of the report
            </span>
            <Button color='green' floated="right" content="See View" />
        </Segment>
    </SegmentGroup>
  )
}
