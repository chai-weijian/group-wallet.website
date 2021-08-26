import {
    Button,
    chakra,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HTMLChakraProps,
    Input,
    Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import {PasswordField} from './PasswordField'
import {FormProvider, useForm} from "react-hook-form";

export const LoginForm = ({formProps = {}, submitButtonLabel, onSubmit}: LoginFormProps) => {
    const methods = useForm<LoginFormData>({mode: 'onBlur'});
    const {register, handleSubmit, formState: {errors, dirtyFields, isValid}} = methods;

    return <FormProvider {...methods}>
        <chakra.form
            onSubmit={handleSubmit(onSubmit)}
            {...formProps}
        >
            <Stack spacing="6">
                <FormControl id="email" isInvalid={errors.email && dirtyFields.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register("email", {required: true})} name="email" type="email" autoComplete="email"/>
                    <FormErrorMessage>{errors.email && `Email is required`}</FormErrorMessage>
                </FormControl>
                <PasswordField/>
                <Button disabled={!isValid} type="submit" colorScheme="blue" size="lg" fontSize="md">
                    {submitButtonLabel}
                </Button>
            </Stack>
        </chakra.form>
    </FormProvider>
}

export type LoginFormData = {
    email: string;
    password: string;
}

export type LoginFormProps = {
    formProps?: HTMLChakraProps<'form'>;
    submitButtonLabel: string;
    onSubmit: ({email, password}: LoginFormData) => void;
}