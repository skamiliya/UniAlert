
import { Header, Menu } from 'semantic-ui-react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { useState } from 'react'

export default function ReportFilter() {
    const [startDate, setStartDate] = useState(new Date())
  return (
    <>
    <Menu vertical size = 'large' style  ={{width: '100%'}}>
        <Header icon = 'filter' attached color = 'teal' content ='Filters'/>
        <Menu.Item 
        content ='All Reports'
        />
        <Menu.Item 
        content ='Liked by Me'
        />
        <Menu.Item 
        content ='Reported by Me'
        />
    </Menu>
    <Header icon = 'calendar' attached color ='teal' content ='Select Date' />
    <Calendar 
    onChange={date => setStartDate(date as Date)}
    value = {startDate}
t
    />
    </>
  )
}
