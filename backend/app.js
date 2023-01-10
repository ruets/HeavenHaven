const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth')
const islandsRoutes = require('./routes/islands')

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/islands', islandsRoutes);

module.exports = app;