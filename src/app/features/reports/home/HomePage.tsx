
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Icon, Button } from 'semantic-ui-react'

export default function HomePage() {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='/categoryImages/logo.png' alt='logo' style={{marginBottom: 12}} />
          UniAlert
        </Header>
        <Button size='huge' inverted as={Link} to={`/reports`}>
          Get Started
          <Icon name='caret right' inverted />
        </Button>
      </Container>
    </Segment>
  )
}
