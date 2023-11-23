import { NavLink } from 'react-router-dom'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useState } from 'react';

export default function NavBar() {
  const [auth, setAuth] = useState(false);

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
        {auth ? <SignedInMenu setAuth={setAuth}/> : <SignedOutButtons setAuth={setAuth} />}
      </Container>
    </Menu>
  )
}
