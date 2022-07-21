const { RSA_NO_PADDING } = require('constants');
var express = require('express');
const project = require('../models/project');
var router = express.Router();

const Project = require('../models/project');

var projectsMaxId;

router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      projectsMaxId = projects.length;
      res.status(200).json({
        message: "Fetched successfully",
        posts: projects
      });
    });
});

router.post('/', (req, res, next) => {
  projectsMaxId++;
  const project = new Project({
    id: projectsMaxId,
    name: req.body.name,
    website: req.body.website,
    imageUrl: req.body.imageUrl
  });
  project.save()
    .then(createdProject => {
      res.status(201).json({
        message: 'Project added successfully',
        projectId: createdProject._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error in adding new project',
        error: error
      });
    });

    console.log(project);
  });

  router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Project.findOne({ id: req.params.id })
      .then(project => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: 'Project deleted successfully'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'An error occured',
              error: error
            });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Project not found',
          error: { project: 'Project not found' }
        });
      });
  });

module.exports = router;
