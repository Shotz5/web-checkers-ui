'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue
} from '@chakra-ui/react'
import NavLink from './components/NavLink';

interface Links {
  content: string,
  url: string
}

const links: Links[] = [
  {
    content: "Home",
    url: "/"
  },
  {
    content: "Recent Games",
    url: "/checkers/recent"
  },
  {
    content: "New Game",
    url: "/checkers/new"
  }
];

export default function Simple({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>Checkers Online</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <NavLink key={link.url} content={link.content} url={link.url} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  bg='teal.500'
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Box p={4}>{children}</Box>
    </>
  )
}
