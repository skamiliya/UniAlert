import { Form } from "semantic-ui-react"
import {Segment, Header, Button, Comment,} from 'semantic-ui-react';
export default function ReportDetailedChat() {
  return (
    <>
<Segment
    textAlign="center"
    attached="top"
    inverted
    color="teal"
    style={{border: 'none'}}
>
    <Header>Comments </Header>
</Segment>

<Segment attached>
    <Comment.Group>
        <Comment>
            <Comment.Avatar src="/categoryImages/user.png"/>
            <Comment.Content>
                <Comment.Author as="a">Reva</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>Tadi liat dimeja makan perpus!</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>

        <Comment>
            <Comment.Avatar src="/categoryImages/user.png"/>
            <Comment.Content>
                <Comment.Author as="a">Brina</Comment.Author>
                <Comment.Metadata>
                    <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                    <p>
                        Tadi kalo gasalah dah ada yang nyerahin ke petugasnya deh
                    </p>
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src="/categoryImages/user.png"/>
                    <Comment.Content>
                        <Comment.Author as="a">Cecil</Comment.Author>
                        <Comment.Metadata>
                            <div>Just now</div>
                        </Comment.Metadata>
                        <Comment.Text>AAA iyaa bener kata brina</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </Comment>

        <Comment>
            <Comment.Avatar src="/categoryImages/user.png"/>
            <Comment.Content>
                <Comment.Author as="a">Ruben</Comment.Author>
                <Comment.Metadata>
                    <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>Sudah ketemu belum?</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>

        <Form reply>
            <Form.TextArea/>
            <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
            />
        </Form>
    </Comment.Group>
</Segment>
</>
  )
}
