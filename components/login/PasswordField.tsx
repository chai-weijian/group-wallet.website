import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useColorModeValue as mode,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiEye, HiEyeOff} from 'react-icons/hi'
import {useFormContext} from "react-hook-form";

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {isOpen, onToggle} = useDisclosure()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const methods = useFormContext();
    const {ref: formControlRef, ...register} = methods.register("password", {required: true, minLength: 6})
    const {formState: {errors, dirtyFields}} = methods;

    const mergeRef = useMergeRefs(inputRef, ref, formControlRef)

    const onClickReveal = () => {
        onToggle()
        const input = inputRef.current
        if (input) {
            input.focus({preventScroll: true})
            const length = input.value.length * 2
            requestAnimationFrame(() => {
                input.setSelectionRange(length, length)
            })
        }
    }

    return (
        <FormControl id="password" isInvalid={errors.password && dirtyFields.password}>
            <Flex justify="space-between">
                <FormLabel>Password</FormLabel>
                <Box as="a" color={mode('blue.600', 'blue.200')} fontWeight="semibold" fontSize="sm">
                    Forgot Password?
                </Box>
            </Flex>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff/> : <HiEye/>}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    ref={mergeRef}
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...props}
                    {...register}
                />
            </InputGroup>
            <FormErrorMessage>{errors.password?.type === 'required' && `Password is required`}</FormErrorMessage>
            <FormErrorMessage>{errors.password?.type === 'minLength' && `Please try a stronger password`}</FormErrorMessage>
        </FormControl>
    )
})

PasswordField.displayName = 'PasswordField'
