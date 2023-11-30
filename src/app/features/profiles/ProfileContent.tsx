

import { Tab } from 'semantic-ui-react'
import ProfileAbout from './ProfileAbout'
import { Profile } from '../../types/profile'
import ProfilePhotos from './ProfilePhotos';
type Props = {
  profile: Profile;
}
export function ProfileContent({profile}:Props) {
    const panes = [
        {menuItem:'About', render:()=><ProfileAbout profile = {profile}/>},
        {menuItem:'Photos', render:()=><ProfilePhotos profile = {profile}/>},
        {menuItem:'Posts', render:()=><Tab.Pane>Posts</Tab.Pane>},
        {menuItem:'Followers', render:()=><Tab.Pane>Followers</Tab.Pane>},
        {menuItem:'Following', render:()=><Tab.Pane>Following</Tab.Pane>},
    ]
  return (
    <Tab
    menu={{fluid: true, vertical: true}}
    menuPosition='right'
    panes={panes}
    />
  )
}

