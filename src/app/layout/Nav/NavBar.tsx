import {Button, Container, Menu, MenuItem} from 'semantic-ui-react'

type Props = {
  setFormOpen: (value: boolean) => void;
}

export default function NavBar({setFormOpen}: Props) {
  return (
    <Menu inverted = {true} fixed='top'>
        <Container>
            <MenuItem header>
                <img src="/logo.png" alt="logo"/>
                UniAlert
            </MenuItem>
            <MenuItem name = 'Report' />

            <MenuItem>
            <Button
            onClick={() => setFormOpen(true)}
            floated='right'
            positive = {true}
            inverted = {true}
            color='red'
            content = 'Create Report' />
            </MenuItem>
            <MenuItem position='right'>
                <Button basic inverted content = 'Login'/>
                <Button basic inverted content = 'Register' style = {{marginLeft: '0.5em'}} />
            </MenuItem>
        </Container>

    </Menu>
  )
}
