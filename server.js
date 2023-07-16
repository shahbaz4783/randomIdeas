const express = require('express');

const app = express();

// Ideas Object

const ideas = [
    {
        id: 1,
        text: 'This is First Idea',
        tag: 'Technology',
        username: 'mike23',
        date: '13-02-22'
    },
    {
        id: 2,
        text: 'This is Second Idea',
        tag: 'Invention',
        username: 'alex12',
        date: '13-02-22'
    },
    {
        id: 3,
        text: 'This is Third Idea',
        tag: 'Software',
        username: 'steve31',
        date: '21-06-22'
    }
]


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Random Ideas API'});
});

// Get all ideas
app.get('/api/ideas', (req, res) => {
    res.json({success: true, data: ideas});
});

// Get particular idea
app.get('/api/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res.status(404).json({success:false, error: 'Requested query not available'})
    }

    res.json({success: true, data: idea});
});


const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
