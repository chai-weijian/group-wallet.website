import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/system'
import * as React from 'react'
import {ForwardedRef, forwardRef} from "react";

// eslint-disable-next-line react/display-name
export const Link = forwardRef((props: HTMLChakraProps<'a'>, ref: ForwardedRef<HTMLAnchorElement>) => (
    <chakra.a
        ref={ref}
        marginStart="1"
        color={useColorModeValue('blue.500', 'blue.200')}
        _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
        display={{ base: 'block', sm: 'inline' }}
        {...props}
    />
))
