const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.post('/create', authMiddleware, async (req, res) => {

  try {

    const { title, description, project } = req.body;

    const newTask = new Task({
      title,
      description,
      project
    });

    await newTask.save();

    res.status(201).json({
      message: 'Task Created',
      task: newTask
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get('/', authMiddleware, async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate('project');

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.put('/update/:id', authMiddleware, async (req, res) => {
      try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: 'Task Updated',
      task: updatedTask
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.delete('/delete/:id', async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Task Deleted'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;