import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [invalidOrNot, setInvalidOrNot] = useState<boolean>(false);

    const loginWithData = (e: any) => {
        e.preventDefault();
        if (username == 'foo' && password == 'bar') {
            localStorage.setItem("loginOrNot", 'true');
            navigate('/home');
        } else {
            setInvalidOrNot(true);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('loginOrNot') == 'true') {
            navigate('/home');
        }
    }, [])
    return (
        <div>
            <h1>SignIn Page</h1>
            <form onSubmit={loginWithData}>
                <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                    <TextField
                        required
                        value={username}
                        variant="standard"
                        label='User Name'
                        onChange={(event: any) => {
                            setInvalidOrNot(false);
                            setUsername(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        value={password}
                        variant="standard"
                        label="Password"
                        type="password"
                        onChange={(event: any) => {
                            setInvalidOrNot(false);
                            setPassword(event.target.value);
                        }}
                    />
                    {invalidOrNot ?
                        <div style={{ color: "red" }}>
                            Invalid Credentials
                        </div> : ""}
                    <Button type="submit" variant="contained" sx={{ width: "100%", marginTop: "30px" }}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}