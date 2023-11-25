import { NavLink } from 'react-router-dom'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'
import SignedOutButtons from './SignedOutButtons'
import SignedInMenu from './SignedInMenu'
import { useAppSelector } from '../../store/store';
import { sampleData } from '../../api/sampleData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function NavBar() {
  const {authenticated} = useAppSelector(state => state.auth)

  function seedData(){
    sampleData.forEach(async report => {
      const{id,...rest}= report;
      await setDoc(doc(db,'reports', id), {
        ...rest
      })
    })
  }

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
        {import.meta.env.DEV && (
          <MenuItem>
          <Button 
          inverted ={true}
          color='teal'
          content='Seed data'
          onClick={seedData}/>
          </MenuItem>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  )
}
