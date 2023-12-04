import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppReport } from "../../../types/report";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../reportSlice";
import LoadingComponent from "../../../layout/LoadingComponent";

export default function ReportForm() {
  const { loadDocument, create, update } = useFirestore('reports');
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      if (report) return { ...report, date: new Date(report.date) }
    }
  });
  const { id } = useParams();
  const report = useAppSelector((state) =>
    state.reports.data.find((r) => r.id === id)
  );
  const { status } = useAppSelector(state => state.reports);
  const{currentUser} = useAppSelector(state=>state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions)
  }, [id, loadDocument])

  async function updateReport(data: AppReport) {
    if (!report) return;
    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }

  async function createReport(data: FieldValues) {
    if(!currentUser) return;
    const ref = await create({
      ...data,
      hostUid:currentUser.uid,
      createBy: currentUser.displayName,
      city: "",
      place: "",
      hostPhotoURL: currentUser.photoURL,
      users: arrayUnion({
        id: currentUser.uid,
        displayName:currentUser.displayName,
        photoURL: currentUser.photoURL

      }),
      userIds:arrayUnion(currentUser.uid),
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return ref;
  }

  async function handleCancelToggle(report: AppReport) {
    await update(report.id, {
      isCancelled: !report.isCancelled
    });
    toast.success(`Report has been ${report.isCancelled ? 'uncancelled' : 'cancelled'}`)
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
        navigate(`/reports/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  if (status === 'loading') return <LoadingComponent />

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
          {...register("description", { required: "Description is Required" })}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />

        <Form.Input
          placeholder="Place"
          defaultValue={report?.place || ""}
          {...register("place", { required: true })}
          error={errors.place && "Place is Required"}
        />

        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is Required" }}
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
                placeholderText="Report Date and Time"
              />
            )}
          />
        </Form.Field>

        {report && (
          <Button
          type='button'
          floated='left'
          color={report.isCancelled ? 'green' : 'red'}
          onClick={() => handleCancelToggle(report)}
          content={report.isCancelled ? 'Reactive report' : 'Cancel report'}
          />
        )}

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
