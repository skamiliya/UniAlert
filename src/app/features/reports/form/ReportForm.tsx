import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppReport } from "../../../types/report";
import { Timestamp } from "firebase/firestore";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-toastify";

export default function ReportForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const { id } = useParams();
  const report = useAppSelector((state) =>
    state.reports.reports.find((r) => r.id === id)
  );
  const navigate = useNavigate();

  async function updateReport(data: AppReport) {
    if (!report) return;
    const docRef = doc(db, 'reports', report.id);
    await updateDoc(docRef, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }

  async function createReport(data: FieldValues) {
    const newReportRef = doc(collection(db, 'reports'));
await setDoc(newReportRef, {
      ...data,
      createBy: "bob",
      city: "",
      place: "",
      hostPhotoURL: "",
      users: [],
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return newReportRef;
  }

  async function onSubmit(data: FieldValues) {
    try {
      console.log("Submitting form data:", data);
  
      if (report) {
        await updateReport({ ...report, ...data });
        console.log("Updated report:", report);
        navigate(`/reports/${report.id}`);  
      } else {
        const ref = await createReport(data);
        console.log("Created report:", ref);
        navigate(`/reports/${ref.id}`);  
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  }
  
  return (
    <Segment clearing>
      <Header content="Report details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Title"
          defaultValue={report?.title || ""}
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={report?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) =>
                setValue("category", d.value, { shouldValidate: true })
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={report?.description || ""}
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />

        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            defaultValue={(report && new Date(report.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          disabled={isSubmitting}
          as={Link}
          to="/reports"
          type="button"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
