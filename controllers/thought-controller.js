const { Thought, User } = require('../models');

const thoughtController = {
    // Get ALL thoughts
  getThoughts(req, res) {
    Thought.find({})
      .select('-__v -reactions._id')
      // selec and sort
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

// Get a single thought by ID
  getSingleThought({params}, res) {
    Thought.findOne({ _id: params.thoughtId})
      .select('-__v -reactions._id')
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this ID found' })
          : res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  }, 
// Post to create a new thought 
  createThought ({params, body}, res) {
    Thought.create(body)
      .then(({_id}) => {
        return User.findOneAndUpdate (
          {_id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((user) =>
      !user 
        ? res.status(404).json({
          message: 'No user found with this Id',
        })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }, 
// Put to update a thought by ID
  updateThought ({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      } 
    )
  },
// Delete to remove a thought by ID
  deleteThought({params}, res) {
    Thought.findOneAndRemove({ _id: params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thoughts created but no user with this id!',
            })
          : res.json({ message: 'Thoughts successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
// Post to create a reaction 
  createReaction ({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $addToSet: { reactions: body } },
        {  runValidators: true, new: true }
      )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json({ message: 'Reaction was successfully added!'. thought});
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        })
  },
// Delete to pull and remove reaction by ID 
  removeReaction ({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } }},
        { runValidators: true, new: true }
      )
      .then(user =>
        res.json(user))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
   },
};

module.exports = thoughtController; 