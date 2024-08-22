'use client'

import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Divider, Heading, Stack, Text, Input, Checkbox } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";

export default function NewGame() {
    const [gameCreateError, setGameCreateError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [opponent, setOpponent] = useState('');

    const handleOpponentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOpponent(e.target.value);
    }

    const createNewGame = async () => {
        setDisabled(true);
        try {
            await axios.get('/api/board/create');
        } catch (error: any) {
            if (error.response.status === 401) {
                setAuthError(true);
            }
            if (error.response.status === 500) {
                setGameCreateError(true);
            }
            setDisabled(false);
        }
    }

    return (
        <>
            {gameCreateError &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Unable to create game</AlertTitle>
                    <AlertDescription>Unable to create CSRF token</AlertDescription>
                </Alert>
            }
            {authError &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Unable to create game</AlertTitle>
                    <AlertDescription>Not authenticated, please login and try again.</AlertDescription>
                </Alert>
            }
            <Center>
                <Stack>
                    <Center>
                        <Stack spacing={3} margin={10}>
                            <Center>
                                <Heading>New Game</Heading>
                            </Center>
                            <Text>Time to square off against your opponent</Text>
                        </Stack>
                    </Center>
                    <Divider width={500} />
                    <Center>
                        <Stack spacing={3} width={300} margin={10}>
                            <Text>Opponent</Text>
                            <Input value={opponent} onChange={handleOpponentChange} disabled={disabled} name="opponent" type="text" placeholder="Search Username" />
                            <Button onClick={createNewGame} isDisabled={disabled || !opponent}>Create new game!</Button>
                        </Stack>
                    </Center>
                </Stack>
            </Center>
        </>
    );
}
