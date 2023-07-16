const express = require('express');
const ideasRouter = require('./routes/ideas')

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Random Ideas API'});
});

// getting ideas route
app.use('/api/ideas', ideasRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});