const { User, Thought } = require('../models');

const userController = {
  // Get ALL users
  getUsers(req, res) {
    User.find()
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });  
  },
// Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'friends', select: '-__v' })
      .populate({ path: 'thoughts', select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// Post a new user 
  createUser ({body}, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  }, 
  // Put to update a user by ID
  updateUser ({params, body}, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      body, {runValidators: true, new: true}
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
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Post to add a new friend 
  addFriend( req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: params.friendID }},
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
  
  }
  // Delete to remove friend 










