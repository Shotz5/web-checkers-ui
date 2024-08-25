'use client'

import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [opponent, setOpponent] = useState(0);

    const handleOpponentChange = (newValue: any) => {
        setOpponent(newValue?.value ?? 0);
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
        }).catch((err: any) => {
            setErrorMessage(err.response.data.message);
            setDisabled(true);
            callback([]);
        });
    }

    const createNewGame = async () => {
        setDisabled(true);
        try {
            const response = await axios.get('/api/board/create', {
                params: {
                    opponent: opponent
                }
            });
            router.push('/checkers/' + response.data.board);
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            setDisabled(false);
        }
    }

    return (
        <>
            {errorMessage &&
                <Alert status="error">
                    <AlertIcon></AlertIcon>
                    <AlertTitle>Unable to create game</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
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
                            <AsyncSelect isDisabled={disabled} loadOptions={getUsers} onChange={handleOpponentChange} />
                            <Button onClick={createNewGame} isDisabled={disabled || !opponent}>Create new game!</Button>
                        </Stack>
                    </Center>
                </Stack>
            </Center>
        </>
    );
}
