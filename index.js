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
    const lastStatus = await prisma.Register.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    if (lastStatus) {
      res.json(lastStatus);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  }catch(e){
    res.status(500).send("Internal server error");
  }
});

app.get('/status/:id', async(req, res) => {
  try{
    const lastStatus = await prisma.Register.findFirst({
      orderBy: { createdAt: 'desc' },
      where:{
        id: Number(req.query.id)
      },
    });
    if (lastStatus) {
      res.json(lastStatus);
    } else {
      res.status(404).json({ error: 'No available state' });
    }
  }catch(e){
    res.status(500).send("Internal server error");
  }
});

app.post('/status', async(req, res) => {
  const { status, type } = req.body;

  try {
    const createdStatus = await prisma.Register.create({
      data: { status, type },
    });

    res.json(createdStatus);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal Server Error ' });
  }
});

app.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.register.groupBy({
      by: ['type'],
      _count: true,
      where: {
        type: { not: null },
        status: "STORING"
      },
    });

    res.json(stats);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
});

app.listen(API_PORT, () => {
  console.log('Scada App Started');
});
