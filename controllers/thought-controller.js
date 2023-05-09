const { Thought, User } = require('../models');

const thoughtController = {
    // Get ALL thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: 'reactions', select: '-__v' })
      // selec and sort? 
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },


// Get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id})
      .populate({ path: 'reactions', select: '-__v' })
      // .select("-__V")
      .then((thoughts) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this ID found' })
          : res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  }, 
// Post to create a new thought 
  createThought (req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate (
          {_id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thoughts) =>
      !user 
        ? res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
        : res.json('Created the thought')
      )
      .catch((err) => res.status(500).json(err));
  }, 
// Put to update a thought by ID
  updateThought (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      } 
    )
  },
// Delete to remove a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
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
  createReaction (req, res) {
    Thought.findOneAndUpdate(
        {_id: req.body.userId },
        { $addToSet: { reactions: req.body } },
        {  runValidators: true, new: true }
      )
      .then((thoughts) => {
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json({ message: 'Reaction was successfully added!'. thoughts});
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        })
  },
// Delete to pull and remove reaction by ID 
  removeReaction (req, res) {
    Thought.findOneAndUpdate(
        {_id: req.body.userId },
        { $pull: { reactions: { reactionId: req.params.reactionId } }},
        { runValidators: true, new: true }
      )
      .then((thoughts) => {
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
   },
};

module.exports = thoughtController; 