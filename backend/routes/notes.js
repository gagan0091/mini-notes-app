const express = require('express');
const auth = require('../middleware/auth');
const Note = require('../models/Note');

const router = express.Router();
router.use(auth); // Protect all routes

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = { user: req.user.id };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  try {
    const notes = await Note.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Note.countDocuments(query);
    res.json({
      notes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await note.deleteOne();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;