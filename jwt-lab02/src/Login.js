import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        console.log("STATUS:", res.status);

        const text = await res.text();
        console.log("RESPUESTA RAW:", text);

        if (!res.ok) {
            throw new Error("Error en login");
        }

        const data = JSON.parse(text);
        console.log("DATA:", data);

        localStorage.setItem("token", data.token);

        //  REDIRECCIÓN
        navigate("/dashboard");

        } catch (error) {
        console.error("ERROR:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="usuario" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}

export default Login;