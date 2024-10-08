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
import NavLink from './NavLink';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link } from '@chakra-ui/next-js';

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

export default function NavBar({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState('');

    axios.get('/api/account/status')
        .then((res: AxiosResponse) => {
            setIsAuth(true);
            setName(res.data.name);
        })
        .catch((err: AxiosError) => {
            setIsAuth(false);
            setName('Not logged in');
        });

    function logout() {
        axios.get('/api/account/logout')
            .then((res: AxiosResponse) => {
                setIsAuth(false);
                setName('Not logged in');
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });
    }

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
                        <NavLink content={name} url={isAuth ? "/account/profile" : "/account/login"} />
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
                            {isAuth ?
                                <MenuList>
                                    <MenuItem as={Link} href="/account/profile">Profile</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                                :
                                <MenuList>
                                    <MenuItem as={Link} href="/account/login">Login</MenuItem>
                                    <MenuItem as={Link} href="/account/create">Create Account</MenuItem>
                                </MenuList>
                            }
                        </Menu>
                    </Flex>
                </Flex>
            </Box>

            <Box p={4}>{children}</Box>
        </>
    )
}
