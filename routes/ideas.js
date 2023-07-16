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


// add ideas
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
		date: new Date().toISOString().slice(0, 10),
    }
    console.log(idea);

    ideas.push(idea);

    res.json({ success: true, data: idea })
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