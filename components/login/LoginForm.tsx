import {
    Button,
    chakra,
    FormControl, FormErrorMessage,
    FormLabel,
    HTMLChakraProps,
    Input,
    Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'
import { useForm, FormProvider } from "react-hook-form";

export const LoginForm = ({formProps = {}, submitButtonLabel}: { formProps?: HTMLChakraProps<'form'>, submitButtonLabel: string }) => {
    const methods = useForm({mode: 'onBlur'});
    const { register, handleSubmit, formState: { errors, dirtyFields, isValid } } = methods;

    return <FormProvider {...methods}>
        <chakra.form
            onSubmit={handleSubmit(data => console.log(data))}
            {...formProps}
        >
            <Stack spacing="6">
                <FormControl id="email" isInvalid={errors.email && dirtyFields.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register("email", { required: true })} name="email" type="email" autoComplete="email"/>
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
