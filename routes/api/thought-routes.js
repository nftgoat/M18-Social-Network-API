const express = require('express')
const router = express.Router()
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts)

// /api.userId
router.route('/:userId').post(createThought);
