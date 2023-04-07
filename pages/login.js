import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";

export default function Login(props){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [favouritesList,setFavouritesList]=useAtom(favouritesAtom);
    const [searchHistory,setSearchHistory]=useAtom(searchHistoryAtom);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        await authenticateUser(user,password).then(async()=>{
            await updateAtoms();
            router.push('/favourites');
        }).catch(err=>{
            setWarning(err.message);
        })
    }

    return (
        <>
        <br />
        <Card bg="light">
            <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>User:</Form.Label>
                <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <br />
            <Button variant="primary" className="pull-right" type="submit">Login</Button>
            <br />
            { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
        </Form>
        </>
    );
}