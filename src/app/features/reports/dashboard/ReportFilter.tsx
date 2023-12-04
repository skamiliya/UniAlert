
import { Header, Menu } from 'semantic-ui-react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { useRef, useState } from 'react'
import { QueryOptions } from '../../../hooks/firestore/type'
import { useAppSelector } from '../../../store/store'
type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

export default function ReportFilter({ setQuery }: Props) {
  const startDate = useRef(new Date());
  const { currentUser } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState('All');
  const { status } = useAppSelector((state) => state.reports);

  function handeSetFilter(filter: string) {
    if (!currentUser?.uid) return;

    let q: QueryOptions[];

    switch (filter) {
      case 'isGoing':
        q = [
          { attribute: 'userIds', operator: 'array-contains', value: currentUser.uid },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      case 'isHost':
        q = [
          { attribute: 'hostUid', operator: '==', value: currentUser.uid },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      default:
        q = [{ attribute: 'date', operator: '>=', value: startDate.current }];
        break;
    }

    setFilter(filter);
    setQuery(q);
  }

  return (
    <>
      <Menu vertical size="large" style={{ width: '100%' }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All Reports"
          onClick={() => handeSetFilter('All')}
          active={filter === 'All'}
          disabled={status === 'loading'}
        />
        <Menu.Item
          content="Liked by Me"
          onClick={() => handeSetFilter('isGoing')}
          active={filter === 'isGoing'}
          disabled={status === 'loading'} 
        />
        <Menu.Item
          content="Reported by Me"
          onClick={() => handeSetFilter('isHost')}
          active={filter === 'isHost'}
          disabled={status === 'loading'} 
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select Date" />
      <Calendar
        onChange={(date) => {
          startDate.current = date as Date;
          handeSetFilter(filter);
        }}
        value={startDate.current}
      />
    </>
  );
}