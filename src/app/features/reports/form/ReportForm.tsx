import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

type Props = {
  setFormOpen: (value: boolean) => void;
};

export default function ReportForm({ setFormOpen }: Props) {
  const initialValues = {
    title: "",
    category: "",
    description: "",
    date: "",
  };
  const [values, setValues] = useState(initialValues);

  function onSubmit(){
    console.log(values);
  }

  function handleInputChange(r: ChangeEvent<HTMLInputElement>) {
    const { name, value } = r.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content="Create Report" />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Title"
            value={values.title}
            name="title"
            onChange={(r) => handleInputChange(r)}
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" 
           value={values.category}
           name="category"
           onChange={(r) => handleInputChange(r)}/>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description"
           value={values.description}
           name="description"
           onChange={(r) => handleInputChange(r)} />
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date" 
           value={values.date}
           name="date"
           onChange={(r) => handleInputChange(r)}/>
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          onClick={() => setFormOpen(false)}
          type="button"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
