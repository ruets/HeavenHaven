const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const islandsRoutes = require('./routes/islands')
const auctionRoutes = require('./routes/auction')

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/imgs/islands/', express.static(path.join(__dirname, 'imgs/islands')));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/islands', islandsRoutes);
app.use('/api/auction', auctionRoutes);

module.exports = app;