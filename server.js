const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde /public

app.post('/log-location', (req, res) => {
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(req.body)}\n`;
    fs.appendFileSync('logs.txt', logEntry);
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
