const path = require('path');
const express = require('express');
const cors = require('cors');
const ideasRouter = require('./routes/ideas');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
// API are served from the same origin
if (process.env.NODE_ENV !== "production") {
    const cors = require("cors");
      app.use(
        cors({
          origin: ["http://localhost:8000", "http://localhost:3000"],
          credentials: true,
        })
      );
    }

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Random Ideas API' });
});

// getting ideas route
app.use('/api/ideas', ideasRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
