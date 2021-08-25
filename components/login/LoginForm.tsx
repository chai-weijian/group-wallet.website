import {
    Button,
    chakra,
    FormControl,
    FormLabel,
    HTMLChakraProps,
    Input,
    Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

export const LoginForm = ({formProps = {}, submitButtonLabel}: { formProps?: HTMLChakraProps<'form'>, submitButtonLabel: string }) => (
    <chakra.form
        onSubmit={(e) => {
            e.preventDefault()
            // your login logic here
        }}
        {...formProps}
    >
        <Stack spacing="6">
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" autoComplete="email" required />
            </FormControl>
            <PasswordField />
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                {submitButtonLabel}
            </Button>
        </Stack>
    </chakra.form>
)
