// const express = require('express');
// const router = express.Router();
// const Note = require('../models/Note');

// // Get all notes
// router.get('/', async (req, res) => {
//     const notes = await Note.find();
//     res.render('index', { notes });
// });

// // Create a new note
// router.post('/', async (req, res) => {
//     const { title, content } = req.body;
//     const note = new Note({ title, content });
//     await note.save();
//     res.redirect('/notes');
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('index', { notes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a note
router.post('/:id/delete', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
