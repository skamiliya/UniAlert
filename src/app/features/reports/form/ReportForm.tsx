import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { createReport, updateReport } from "../reportSlice";
import { createId } from "@paralleldrive/cuid2";

export default function ReportForm() {
  let { id } = useParams();
  const report = useAppSelector((state) =>
    state.reports.reports.find((r) => r.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues = report ?? {
    title: "",
    category: "",
    description: "",
    date: "",
  };
  const [values, setValues] = useState(initialValues);

  function onSubmit() {
    id = id ?? createId();
    report
      ? dispatch(updateReport({ ...report, ...values }))
      : dispatch(
          createReport({
            ...values,
            id: createId(),
            createBy: "bob",
            city: "",
            place: "",
            hostPhotoURL: "",
            users: [],
          })
        );
    navigate(`/reports/${id}`);
  }

  function handleInputChange(r: ChangeEvent<HTMLInputElement>) {
    const { name, value } = r.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content={report ? "Update Report" : "Create Report"} />
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
          <input
            type="text"
            placeholder="Category"
            value={values.category}
            name="category"
            onChange={(r) => handleInputChange(r)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            value={values.description}
            name="description"
            onChange={(r) => handleInputChange(r)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            value={values.date}
            name="date"
            onChange={(r) => handleInputChange(r)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button type="button" floated="right" content="Cancel" />
      </Form>
    </Segment>
  );
}
