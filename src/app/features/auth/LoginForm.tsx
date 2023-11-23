import { Button, Form } from "semantic-ui-react";
import ModalWrapper from "../../common/modals/ModalWrapper";
import { closeModal } from "../../common/modals/modalSlice";
import { useAppDispatch } from "../../store/store";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "./authSlice";

export default function LoginForm() {
    const { register, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
        mode: 'onTouched'
    })
    const dispatch = useAppDispatch();

    function onSubmit(data: FieldValues) {
        dispatch(signIn(data))
        dispatch(closeModal());
    }

    return (
        <ModalWrapper header='Sign into UniAlert'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue=''
                    placeholder='Email address'
                    {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}
                    error={
                        errors.email?.type === 'required' && 'Email is required' ||
                        errors.email?.type === 'pattern' && 'Email is invalid'
                    }
                />
                <Form.Input
                type='password'
                    defaultValue=''
                    placeholder='Password'
                    {...register('password', { required: true })}
                    error={errors.password && 'Password is required'}
                />
                <Button
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Login'
                />

            </Form>

        </ModalWrapper>
    )
}
