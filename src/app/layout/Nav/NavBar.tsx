import { NavLink } from 'react-router-dom'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useAppSelector } from '../../store/store';


export default function NavBar() {
  const { authenticated } = useAppSelector(state => state.auth)


  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" />
          UniAlert
        </MenuItem>
        <MenuItem name='Report' as={NavLink} to={`/reports`} />
        <MenuItem name='Scratch' as={NavLink} to={`/scratch`} />

        <MenuItem>
          <Button
            as={NavLink}
            to={`/createReport`}
            floated='right'
            positive={true}
            inverted={true}
            color='red'
            content='Create Report' />
        </MenuItem>

        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
