const express = require('express');
const connectDB = require('./database');
const cors = require("cors");
const morgan = require('morgan');
const { readdirSync } = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerConfig = require('./documentation/swagger.config.json');
// const userRoutes = require('./routes/user');
require('dotenv').config();

// app-server
const app = express();

// db-connection

connectDB();

// middlewares-server
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));  // quiere decir que solo con json
app.use(cors());

const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));

// routes middlewares-fs: option 1 (no optima)
//app.use('/',userRoutes);

// routes middlewares-fs: option 2 (optime)
readdirSync('./routes').map( (r) => app.use('/api', require('./routes/' + r)));

// port
const port = process.env.PORT || 8000;

// listen
app.listen(port, () => console.log(`Server is running on port ${port}`));