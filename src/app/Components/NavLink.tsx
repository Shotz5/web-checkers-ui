import { Box, useColorModeValue } from "@chakra-ui/react"
import { Link } from '@chakra-ui/next-js';

export default function NavLink({ content, url }: Readonly<{ content: string, url: string }>) {
    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={'md'}
            _hover={url && {
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={url}
        >
            {content}
        </Box>
    )
}
