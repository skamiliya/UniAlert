import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { createReport, updateReport } from "../reportSlice";
import { createId } from "@paralleldrive/cuid2";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function ReportForm() {
  const { register, control, setValue, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: 'onTouched'
  });
  let { id } = useParams();
  const report = useAppSelector((state) =>
    state.reports.reports.find((r) => r.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  function onSubmit(data: FieldValues) {
    id = id ?? createId();
    report
      ? dispatch(updateReport({ ...report, ...data, date: data.date.toString()}))
      : dispatch(
        createReport({
          ...data,
          id,
          createBy: "bob",
          city: "",
          place: "",
          hostPhotoURL: "",
          users: [],
          date: data.date.toString(),
        })
      );
    navigate(`/reports/${id}`);
  }

  return (
    <Segment clearing>
      <Header content='Report details' sub color='teal' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Title"
          defaultValue={report?.title || ''}
          {...register('title', { required: true })}
          error={errors.title && 'Title is required'}
        />

        <Controller
          name='category'
          control={control}
          rules={{ required: 'Category is required' }}
          defaultValue={report?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={report?.description || ''}
          {...register('description', { required: 'Description is required' })}
          error={errors.description && errors.description.message}
        />
        <Header sub content='Location details' color='teal' />

        <Form.Field>
          <Controller
            name='date'
            control={control}
            rules={{ required: 'Date is required' }}
            defaultValue={report && new Date(report.date) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={value => setValue('date', value, { shouldValidate: true })}
                showTimeSelect
                timeCaption="time"
                dateFormat='MMM d, yyyy h:mm aa'
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type='submit' floated='right' positive content='Submit' />
        <Button disabled={isSubmitting} as={Link} to='/reports' type='button' floated='right' content='Cancel' />
      </Form>
    </Segment >
  );
}
