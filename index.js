const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");
const { API_PORT } = process.env;
app.use(bodyParser.json());

let lastStatusMessage = null;

app.use(
  cors({
    origin: "*",
  })
);

app.get('/status', (req, res) => {
  if (lastStatusMessage) {
    res.json(lastStatusMessage);
  } else {
    res.status(404).json({ error: 'No hay un mensaje de estado disponible' });
  }
});

app.post('/status', (req, res) => {
  const statusMessage = req.body;
  lastStatusMessage = statusMessage;
  res.json({ message: 'Mensaje de estado recibido correctamente' });
});

app.listen(API_PORT, () => {
  console.log('Scada App Started');
});
