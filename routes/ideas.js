const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')

// Ideas Object
const ideas = [
	{
		id: 1,
		text: 'This is First Idea',
		tag: 'Technology',
		username: 'mike23',
		date: '13-02-22',
	},
	{
		id: 2,
		text: 'This is Second Idea',
		tag: 'Invention',
		username: 'alex12',
		date: '13-02-22',
	},
	{
		id: 3,
		text: 'This is Third Idea',
		tag: 'Software',
		username: 'steve31',
		date: '21-06-22',
	},
];

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
    }
});

// Get particular idea
router.get('/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === +req.params.id);

	if (!idea) {
		return res
			.status(404)
			.json({ success: false, error: 'Requested query not available' });
	}

	res.json({ success: true, data: idea });
});


// add ideas
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
		tag: req.body.tag,
		username: req.body.username
    });

    try {
        const savedIdea = await idea.save();
        res.json({ success:true, data: savedIdea })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: 'Something went wrong' })
    }
})

// Update ideas
router.put('/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === +req.params.id);

	if (!idea) {
		return res
			.status(404)
			.json({ success: false, error: 'Requested query not available' });
	}

    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;

	res.json({ success: true, data: idea });
});


// Delete ideas
router.delete('/:id', (req, res) => {
	const idea = ideas.find((idea) => idea.id === +req.params.id);

	if (!idea) {
		return res
			.status(404)
			.json({ success: false, error: 'Requested query not available' });
	}

    const index = ideas.indexOf(idea);
    ideas.splice(index, 1)

	res.json({ success: true, data: {} });
});


module.exports = router;