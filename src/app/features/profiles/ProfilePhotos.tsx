import { useState } from "react";
import { Button, Card, Grid, Header, Tab, Image } from "semantic-ui-react";
import { Profile } from "../../types/profile";
import { auth } from "../../config/firebase"; // assuming you have auth imported

type Props = {
  profile: Profile;
};

export default function ProfilePhotos({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="photo" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add photo"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <p>Upload photo here</p>
          ) : (
            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src="/user.png" />
                {isCurrentUser && (
                  <Button.Group>
                    <Button basic color="green">
                      Main
                    </Button>
                    <Button basic color="red" icon="trash">
                      Delete
                    </Button>
                  </Button.Group>
                )}
              </Card>
              {/* Add more Card components as needed */}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
