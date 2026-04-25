const jwt = require('jsonwebtoken');

const SECRET_KEY = "mi_clave_secreta";

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: "Token requerido" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.user = decoded;
        next();
    });
}//verifyToken

module.exports = verifyToken;