import { Tab } from 'semantic-ui-react'
import ProfileAbout from './ProfileAbout'
import { Profile } from '../../types/profile'
import ProfilePhotos from './ProfilePhotos';
import ProfileReports from './ProfileReports';
import FollowTab from './follow/FollowTab';
import { useState } from 'react';

type Props = {
  profile: Profile;
}

export function ProfileContent({profile}:Props) {
  const [activeTab, setActiveTab] = useState(0)
    const panes = [
        {menuItem:'About', render:()=><ProfileAbout profile = {profile}/>},
        {menuItem:'Photos', render:()=><ProfilePhotos profile = {profile}/>},
        {menuItem:'Posts', render:()=><ProfileReports profile={profile}/>},
        {menuItem:'Followers', render:()=><FollowTab profileId={profile.id} activeTab={activeTab} />},
        {menuItem:'Following', render:()=><FollowTab profileId={profile.id} activeTab={activeTab}/>},
    ]
  return (
    <Tab
    menu={{fluid: true, vertical: true}}
    menuPosition='right'
    panes={panes}
    onTabChange={(_e, data) => setActiveTab(data.activeIndex as number)}
    />
  )
}


