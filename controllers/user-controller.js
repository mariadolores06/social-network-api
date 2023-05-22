const { User, Thought } = require('../models');

const userController = {
  // Get ALL users
  getUsers(req, res) {
    User.find()
      .populate({ path: 'friends', select: '-__v -_id -thoughts' })
      .populate({ path: 'thoughts', select: '-__v -_id' })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });  
  },
// Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'friends', select: '-__v -_id -thoughts' })
      .populate({ path: 'thoughts', select: '-__v -_id' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// Post a new user 
  createUser (req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  }, 
  // Put to update a user by ID
  updateUser (req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body},
      { new: true}
    )
      .then((user) =>
        !user
        ? res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      : res.json(user)
    )
  .catch((err) => res.status(500).json(err));
  },

  // Delete to remove a user by ID & associated thoughts
  deleteUser (req, res) {
    User.findOneAndRemove({ _id: req.params.userId})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany(
            { username: user.userman },
            { new: true})
      )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'User deleted, but no thoughts found!'})
          : res.json({ message: "'User and associated apps deleted!'"})
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Post to add a new friend 
  createFriend( req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendID }},
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
      )
    .catch((err) => res.status(500).json(err));
    },
  
  
  // Delete to remove friend 
  removeFriend( req, res) {
    User.findOneAndUpdate(
      {_id: req.body.friendId},
      { $pull: { friends: { friendId: req.params.friendId } }},
      { runValidators: true, new:true }
    )
    .then((user) => {
      !user
        ? res.status(404).json({ message: 'No friends with this id!' })
        : res.json(user);
      })
    .catch ((err) => {
      console.log(err);
      res.status(500).json(err);
    }); 
  }, 
};

module.exports = userController;










