// Amezcua Kevin Elias
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'mi_clave_secreta';
const user = [
    {
        id: 1,
        username: 'admin',
        password: '1234'
    },
    {
        id: 2,
        username: 'user',
        password: '1234'
    }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const foundUser = user.find(
        u => u.username === username && u.password === password
    );

    if (foundUser) {
        const token = jwt.sign(
            { id: foundUser.id, username: foundUser.username },
            SECRET_KEY,
            { expiresIn: '5m' }
        );

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

const verifyToken = require('./middleware/auth.js');

app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ 
        message: 'Bienvenido al Dashboard',
        user: req.user
    });
});

app.get('/public', (req, res) => {
    res.json({ message: 'Esta es una ruta pública, no se requiere autenticación' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo - Amezcua Kevin Elias' });
});

app.get('/steal', (req, res) => {
    console.log("TOKEN ROBADO:", req.query.token);
    res.json({message: "TOKEN ROBADO"})
})

app.listen(4000, () => {
    console.log('Servidor Corriendo en el puerto 4000');
});
