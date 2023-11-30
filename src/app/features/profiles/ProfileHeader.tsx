
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  ItemGroup,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../types/profile";

type Props = {
  profile: Profile
}
export default function ProfileHeader({profile} :Props ){
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <ItemGroup>
            <Item>
              <Item.Image avatar size="small" src={profile.photoURL || "/categoryImages/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h2"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={10} />
            <Statistic label="Following" value={5} />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button basic fluid color="red" content="Unfollow" />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
