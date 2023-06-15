const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let lastStatusMessage = null;

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

app.listen(8080, () => {
  console.log('Scada App Started');
});
