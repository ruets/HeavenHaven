const express = require('express');
const path = require('path');
const config = require('./config/config');

const islandRoutes = require('./routes/island');
const auctionRoutes = require('./routes/auction');
const billingRoutes = require('./routes/billing');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/islands', islandRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;