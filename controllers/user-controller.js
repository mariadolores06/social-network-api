const { User, Thought } = require('../models');

const userController = {
 // get all users
  getUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

  // get one user by id
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
  },

  // createUser
  createUser(req, res) {
      User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
                return;
          }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
     })
      .then(() => {
        res.json({ message: 'user has been deleted.' });
      })
      .catch(err => res.status(400).json(err));
  },

  // add friend
  createFriend({ params }, res) {
      User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

}

module.exports = userController;