import { Item, Label, Segment } from "semantic-ui-react";
import { AppReport } from "../../../types/report";
import { Link } from "react-router-dom";
type Props ={
    report:AppReport
}

export default function ReportDetailedSidebar({report}:Props) {
  return (
    <>
<Segment
    textAlign="center"
    style={{border: 'none'}}
    attached="top"
    secondary
    inverted
    color="teal"
>
   {report.users.length} People Liked 
</Segment>
<Segment attached>
    <Item.Group relaxed divided>
        {report.users.map(user =>
         <Item style={{position: 'relative'}}key = {user.id}>
            {report.hostUid === user.id &&(
                <Label style = {{position : 'abssolute'}} color ='orange' ribbon ='right' >
                    Author
                </Label>
        )}
         <Item.Image size="tiny" src={user.photoURL ||`/categoryImages/user.png`}/>
         <Item.Content verticalAlign="middle">
             <Item.Header as={Link} to =  {`/profiles/${user.id}`} >
                 <span>{user.displayName}</span>
             </Item.Header>
         </Item.Content>
     </Item>
            )}
    </Item.Group>
</Segment>
</>
  )
}
