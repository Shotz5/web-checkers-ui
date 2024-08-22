'use client'

import { Button, Center, Input, Stack, Text, Heading, Divider, Alert, AlertIcon, AlertTitle, AlertDescription, Link, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [csrfError, setCsrfError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRemember(e.target.checked);
    }

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        setDisabled(true);

        try {
            await axios.get('/api/csrf-cookie');
        } catch {
            setCsrfError(true);
        }

        try {
            await axios.post('/api/account/login', {
                email: email,
                password: password,
                remember: remember
            });
            window.location.href = "/";
        } catch (error: any) {
            setLoginError(true);
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
            {loginError &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Authentication failed</AlertTitle>
                    <AlertDescription>Username or password is incorrect</AlertDescription>
                </Alert>
            }
            <Center>
                <Stack>
                    <Center>
                        <Stack margin={10}>
                            <Heading>Log in to play checkers!</Heading>
                        </Stack>
                    </Center>
                    <Divider width={500} />
                    <Center>
                        <Stack spacing={3} width={300} margin={10}>
                            <Text>Email</Text>
                            <Input value={email} onChange={handleEmailChange} disabled={disabled} name="email" type="email" placeholder="john.doe@checkers.com" />
                            <Text>Password</Text>
                            <Input value={password} onChange={handlePasswordChange} disabled={disabled} name="password" type="password" placeholder="**********" />
                            <Text>Remember me</Text>
                            <Checkbox name="remember" onChange={handleRememberChange}></Checkbox>
                            <Button onClick={handleSubmit} isDisabled={disabled}>Log in!</Button>
                        </Stack>
                    </Center>
                </Stack>
            </Center>
        </>
    )
}
