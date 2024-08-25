'use client'

import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Divider, Heading, Stack, Text, Input } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AsyncSelectComponent } from "chakra-react-select";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";

const AsyncSelect = dynamic(() => import("chakra-react-select").then((module) => module.AsyncSelect), { ssr: false });

interface User {
    id: number,
    username: string
}

interface OptionType {
    value: number,
    label: string,
}

export default function NewGame() {
    const [gameCreateError, setGameCreateError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [opponent, setOpponent] = useState('');

    const handleOpponentChange = (newValue: unknown) => {
        setOpponent(newValue as string);
    }

    const getUsers = (inputValue: string, callback: any) => {
        let results: OptionType[] = [];
        axios.get('/api/account/search', {
            params: {
                username: inputValue
            }
        }).then((res: AxiosResponse<User[]>) => {
            res.data.forEach(element => {
                results.push({
                    value: element.id,
                    label: element.username
                })
            });
            callback(results);
        }).catch((res: AxiosError) => {
            setDisabled(true);
            setAuthError(true);
            callback([]);
        });
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
                    <AlertTitle>Unable to do action</AlertTitle>
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
                            <AsyncSelect value={opponent} isDisabled={disabled} loadOptions={getUsers} onChange={handleOpponentChange} />
                            <Button onClick={createNewGame} isDisabled={disabled || !opponent}>Create new game!</Button>
                        </Stack>
                    </Center>
                </Stack>
            </Center>
        </>
    );
}
