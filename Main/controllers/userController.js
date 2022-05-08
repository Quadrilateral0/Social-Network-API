// const { ObjectId } = require('mongoose').Types;
const { thought, user } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    user.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    user.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'Thought and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
   // Add a friend
   addFriend(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Delete a friend
    deleteFriend(req, res) {
      user.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: { friendsId: req.params.friendsId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};
