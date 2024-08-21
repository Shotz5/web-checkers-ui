'use client'

import { Button, Center, Input, Stack, Text, Heading, Divider, Alert, AlertIcon, AlertTitle, AlertDescription, Link } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [csrfError, setCsrfError] = useState(false);
    const [createdAccount, setCreatedAccount] = useState(false);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        setDisabled(true);

        try {
            await axios.get('/api/csrf-cookie');
        } catch {
            setCsrfError(true);
        }

        try {
            await axios.post('/api/account/create', {
                name: name,
                email: email,
                password: password
            });
            setCreatedAccount(true);
        } catch {
            setDisabled(false);
        }
    }

    return (
        <>
            {csrfError &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>CSRF Token Error</AlertTitle>
                    <AlertDescription>Unable to create CSRF token</AlertDescription>
                </Alert>
            }
            {createdAccount &&
                <Alert status="success">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Created account</AlertTitle>
                    <AlertDescription>Successfully created account, click <Link href="/account/login">here</Link> to login</AlertDescription>
                </Alert>
            }
            <Center>
                <Stack>
                    <Center>
                        <Stack margin={10}>
                            <Heading>Sign up for Checkers!</Heading>
                        </Stack>
                    </Center>
                    <Divider width={500} />
                    <Center>
                        <Stack spacing={3} width={300} margin={10}>
                            <Text>Name</Text>
                            <Input value={name} onChange={handleNameChange} disabled={disabled} name="name" placeholder="John Doe" />
                            <Text>Email</Text>
                            <Input value={email} onChange={handleEmailChange} disabled={disabled} name="email" type="email" placeholder="john.doe@checkers.com" />
                            <Text>Password</Text>
                            <Input value={password} onChange={handlePasswordChange} disabled={disabled} name="password" type="password" placeholder="**********" />
                            <Button onClick={handleSubmit} disabled={disabled}>Sign Up</Button>
                        </Stack>
                    </Center>
                </Stack>
            </Center>
        </>
    );
}
