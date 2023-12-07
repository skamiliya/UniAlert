import { useEffect, useState } from 'react';
import { Tab, Grid, Header, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Profile } from '../../types/profile';
import { useAppSelector } from '../../store/store';
import { CollectionOptions } from '../../hooks/firestore/type';
import { actions } from '../reports/reportSlice';
import { useFirestore } from '../../hooks/firestore/useFirestore';
import { format } from 'date-fns';

type Props = {
  profile: Profile;
};

export default function ProfileReports({ profile }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const { loadCollection } = useFirestore('reports');
  const { data: reports, status } = useAppSelector((state) => state.reports);

  const panes = [
    { menuItem: 'All Reports', pane: { key: 'all' } },
  ];

  const initialOptions: CollectionOptions = {
    queries: [
      { attribute: 'hostUid', operator: '==', value: profile.id },
    ],
  };

  const [options, setOptions] = useState<CollectionOptions>(initialOptions);

  useEffect(() => {
    loadCollection(actions, options);
  }, [loadCollection, options]);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='post' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(_r, data) => setActiveTab(data.activeIndex as number)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
            {reports.map(report => (
              <Card as={Link} to='/' key={report.id}>
                <Image src={`/categoryImages/${report.category}.jpg`} style={{ minHeight: 100, objectFit: 'cover' }} />
                <Card.Content>
                  <Card.Header content={report.title} textAlign='center' />
                  <Card.Meta textAlign='center'>
                    <span> {format(new Date(report.date), 'dd MMM yyyy, h:mm a')} </span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
