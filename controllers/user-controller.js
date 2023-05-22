const { User, Thought } = require('../models');

const userController = {
  // Get ALL users
  getUsers(req, res) {
    User.find({})
      .populate({ path: 'friends', select: '-__v -_id -thoughts' })
      .populate({ path: 'thoughts', select: '-__v -_id' })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });  
  },
// Get a single user
  getSingleUser({params}, res) {
    User.findOne({ _id: params.id })
      .populate('friends')
      .populate('thoughts')
      .select('-_v')
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
      { _id: params.id },
      body,
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
  createFriend({params}, res) {
      User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId }},
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
  removeFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.id},
      { $pull: { friends: params.friendId}},
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










