import { Box, useColorModeValue } from "@chakra-ui/react"

export default function NavLink({ content, url }: Readonly<{ content: string, url: string }>) {

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={url}>
      {content}
    </Box>
  )
}
