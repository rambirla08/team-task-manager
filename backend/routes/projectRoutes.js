const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

router.post('/create', async (req, res) => {

  try {

    const { name, description } = req.body;

    const project = new Project({
      name,
      description
    });

    await project.save();

    res.status(201).json({
      message: 'Project Created',
      project
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

router.get('/', async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;