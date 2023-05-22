const { Thought, User } = require('../models');

const thoughtController = {
    // Get ALL thoughts
  getThoughts(req, res) {
<<<<<<< HEAD
    Thought.find({})
      .select('-__v -reactions._id')
      // selec and sort
      .then((thought) => res.json(thought))
=======
    Thought.find()
      .populate({ path: 'reactions', select: '-__v' })
      // selec and sort? 
      .then((thoughts) => res.json(thoughts))
>>>>>>> parent of e25e630 (small updates and fixed some typos)
      .catch((err) => res.status(500).json(err));
  },


// Get a single thought by ID
<<<<<<< HEAD
  getSingleThought({params}, res) {
    Thought.findOne({ _id: params.thoughtId})
      .select('-__v -reactions._id')
      .then((thought) => {
=======
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id})
      .populate({ path: 'reactions', select: '-__v' })
      // .select("-__V")
      .then((thoughts) => {
>>>>>>> parent of e25e630 (small updates and fixed some typos)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of e25e630 (small updates and fixed some typos)
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
<<<<<<< HEAD
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
=======
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
>>>>>>> parent of e25e630 (small updates and fixed some typos)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      } 
    )
  },
// Delete to remove a thought by ID
<<<<<<< HEAD
  deleteThought({params}, res) {
    Thought.findOneAndRemove({ _id: params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
=======
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
>>>>>>> parent of e25e630 (small updates and fixed some typos)
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
<<<<<<< HEAD
        {_id: params.thoughtId },
        { $addToSet: { reactions: body } },
=======
        {_id: req.body.userId },
        { $addToSet: { reactions: req.body } },
>>>>>>> parent of e25e630 (small updates and fixed some typos)
        {  runValidators: true, new: true }
      )
      .then((thoughts) => {
        !thoughts
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
<<<<<<< HEAD
        {_id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } }},
        { runValidators: true, new: true }
      )
      .then(user =>
        res.json(user))
      .catch((err) => {
=======
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
>>>>>>> parent of e25e630 (small updates and fixed some typos)
          console.log(err);
          res.status(500).json(err);
        });
   },
};

module.exports = thoughtController; 