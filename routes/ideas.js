const express = require('express');
const router = express.Router();


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
router.get('/', (req, res) => {
	res.json({ success: true, data: ideas });
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


module.exports = router;