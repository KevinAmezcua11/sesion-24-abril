import { useState, useEffect } from "react";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:4000/dashboard", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => setMessage(data.message));
}, []);

const addComment = () => {
    //  VULNERABLE A XSS
    setComments([...comments, comment]);
};

    return (
        <div>
            <h2>{message}</h2>

            <input
                placeholder="Escribe un comentario"
                onChange={e => setComment(e.target.value)}
            />
            
            <button onClick={addComment}>Agregar</button>

            <div>
                {comments.map((c, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: c }} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;