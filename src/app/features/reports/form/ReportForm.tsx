import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { AppReport } from "../../../types/report";
import { createId } from "@paralleldrive/cuid2";

type Props = {
  setFormOpen: (value: boolean) => void;
  addReport: (report: AppReport) => void;
  selectedReport: AppReport | null
  updateReport: (report: AppReport) => void;
};

export default function ReportForm({ setFormOpen, addReport, selectedReport, updateReport }: Props) {
  const initialValues = selectedReport ?? {
    title: "",
    category: "",
    description: "",
    date: "",
  };
  const [values, setValues] = useState(initialValues);

  function onSubmit(){
    selectedReport 
        ? updateReport({...selectedReport, ...values})
        : addReport({...values, id: createId(), createBy: '', city: '', place: '', hostPhotoURL: '', users: []})
    setFormOpen(false);
  }

  function handleInputChange(r: ChangeEvent<HTMLInputElement>) {
    const { name, value } = r.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content={selectedReport ? "Update event" : "Create Report"} />
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
