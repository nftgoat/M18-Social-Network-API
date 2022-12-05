const { Users, Thoughts } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .populate({ path: "reactions", select: "-__v" })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thoughts.findById(req.params.thoughtId)
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(
        (thought) => {
        Users.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { thoughts: thought } },
            { new: true }
          )
            .then((userData) => {
              !userData
                ? res.status(404).json({ message: "No user with that ID" })
                : res.json(userData);
            })
            .catch((err) => res.status(500).json(err))
        }
      )
      .catch((err) => res.status(500).json(err));
  }}