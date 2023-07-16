const express = require('express');
const ideasRouter = require('./routes/ideas')

const app = express();


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Random Ideas API'});
});

// getting ideas route
app.use('/api/ideas', ideasRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});