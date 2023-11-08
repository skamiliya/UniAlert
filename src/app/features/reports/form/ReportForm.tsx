import {Button, Form, Header, Segment} from 'semantic-ui-react'

type Props = {
    setFormOpen: (value: boolean) => void;
}

export default function ReportForm({setFormOpen}: Props) {
  return (
    <Segment clearing>
        <Header content='Create Report' />
        <Form>
            <Form.Field>
                <input type="text" placeholder='Title' />
            </Form.Field>
            <Form.Field>
                <input type="text" placeholder='Category' />
            </Form.Field>
            <Form.Field>
                <input type="text" placeholder='Description' />
            </Form.Field>
            <Form.Field>
                <input type="text" placeholder='Date' />
            </Form.Field>

            <Button type='submit' floated='right' positive content='Submit' />
            <Button onClick={() => setFormOpen(false)} type='button' floated='right' content='Cancel' />
        </Form>
    </Segment>
  )
}
