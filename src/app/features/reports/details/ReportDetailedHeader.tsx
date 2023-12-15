import { Link, useLocation, useNavigate } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppReport } from "../../../types/report";
import { useAppSelector } from "../../../store/store";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { useState } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { format } from "date-fns";

type Props = {
  report: AppReport;
};

export default function ReportDetailedHeader({ report }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { update } = useFirestore("reports");
  const navigate = useNavigate();
  const location = useLocation();
  const reportImageStyle = {
    filter: "brightness(30%)",
  };

  const reportImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  async function toggleUsers() {
    if (!currentUser) return navigate ('/unauthorized', {state:{from: location.pathname}})
    
    setLoading(true);

    if (report.isGoing) {
      const user = report.users.find((x) => x.id === currentUser.uid);
      await update(report.id, {
        users: arrayRemove(user),
        userIds: arrayRemove(currentUser.uid),
      });
      setLoading(false);
    } else {
      await update(report.id, {
        users: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        userIds: arrayUnion(currentUser.uid),
      });
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/categoryImages/${report.category}.png`}
          fluid
          style={reportImageStyle}
        />

        <Segment basic style={reportImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={report.title}
                  style={{ color: "white" }}
                />
                <p> {format(new Date(report.date), 'dd MMM yyyy, h:mm a')} </p>
                <p style={{ color: "white" }}>{report.createBy} </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {report.isHost ? (
          <Button
            as={Link}
            to={`/manage/${report.id}`}
            color="orange"
            floated="right"
          >
            Manage Report
          </Button>
        ) : (
          <Button
            content={report.isGoing ? "Unlike" : "Like"}
            color={report.isGoing ? "grey" : "teal"}
            onClick={toggleUsers}
            loading={loading}
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
