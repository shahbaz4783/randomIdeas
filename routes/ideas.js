const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
	try {
		const ideas = await Idea.find();
		res.json({ success: true, data: ideas });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: 'Something went wrong' });
	}
});

// Get particular idea
router.get('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		res.json({ success: true, data: idea });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, data: 'Something went wrong' });
	}
});

// add ideas
router.post('/', async (req, res) => {
	const idea = new Idea({
		text: req.body.text,
		tag: req.body.tag,
		username: req.body.username,
	});

	try {
		const savedIdea = await idea.save();
		res.json({ success: true, data: savedIdea });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, data: 'Something went wrong' });
	}
});

// Update ideas
router.put('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);
		// username matches
		if (idea.username === req.body.username) {
			const updatedIdea = await Idea.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						text: req.body.text,
						tag: req.body.tag,
					},
				},
				{ new: true }
			);
			res.json({ success: true, data: updatedIdea });
		}

		// username do not matches
		res
			.status(403)
			.json({
				success: false,
				data: 'You are not authorised to update the data',
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, data: 'Something went wrong' });
	}
});

// Delete ideas
router.delete('/:id', async (req, res) => {
	try {
		const idea = await Idea.findById(req.params.id);

		// username matches
		if (idea.username === req.body.username) {
			const deleteIdea = await Idea.findByIdAndDelete(req.params.id);
			return res.json({ success: true, data: deleteIdea });
		}

		// username do not matches
		res
			.status(403)
			.json({
				success: false,
				data: 'You are not authorised to deleted the data',
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, data: 'Something went wrong' });
	}
});

module.exports = router;
