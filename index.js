const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const cors = require("cors");
const { API_PORT } = process.env;
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get('/status/latest', async(req, res) => {
  try{
    const lastStatus = await prisma.Status.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    if (lastStatus) {
      res.json(lastStatus);
    } else {
      res.status(404).json({ error: 'No hay un mensaje de estado disponible' });
    }
  }catch(e){
    res.status(500).send("Internal server error");
  }
});

app.post('/status', async(req, res) => {
  const { status } = req.body;

  try {
    const createdStatus = await prisma.Status.create({
      data: { status },
    });

    res.json(createdStatus);
  } catch (error) {
    console.log('Error al guardar el mensaje de estado:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje de estado' });
  }
});

app.listen(API_PORT, () => {
  console.log('Scada App Started');
});
