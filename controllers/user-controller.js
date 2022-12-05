const { Users, Thoughts } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    Users.find()
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user
  getSingleUser(req, res) {
    Users.findById(req.params.userId)
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    Users.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // delete a user and associated apps
  deleteUser(req, res) {
    Users.findByIdAndDelete(req.params.userId)
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts._id } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  }}
  // add a reaction
  addReaction(req, res); {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  }
  // delete a reaction
  deleteReaction(req, res); {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: {_id : req.params.reactionId }} },
      { new: true }
    )
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No reaction with that ID" })
          : res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  };