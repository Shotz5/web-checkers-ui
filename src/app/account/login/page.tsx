'use client'

import { Button, Center, Input, Stack, Text, Heading, Divider, Alert, AlertIcon, AlertTitle, AlertDescription, Link, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
        }

        try {
            await axios.post('/api/account/login', {
                email: email,
                password: password,
                remember: remember
            });
            router.push('/');
        } catch (err: any) {
            setErrorMessage(err.response.data.message);
            setDisabled(false);
        }
    }

    return (
        <>
            {errorMessage &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
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
