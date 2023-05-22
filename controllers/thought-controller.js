const { Thought, User } = require('../models');

const thoughtController = {
    // Get ALL thoughts
  getThoughts(req, res) {
    Thought.find({})
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(400).json(err));
  },

// Get a single thought by ID
  getSingleThought({params}, res) {
    Thought.findOne({ _id: params.id})
      .populate({path: 'reactions',select: '-__v'})
      .select('-__v')
      .then(thought => {
        !thought
          ? res.status(404).json({ message: 'No thought with this ID found' })
          : res.json(thought)
      })
      .catch((err) => res.status(400).json(err));
  }, 
// Post to create a new thought 
  createThought ({params, body}, res) {
    Thought.create(body)
      .then(({_id}) => {
        return User.findOneAndUpdate (
          {_id: params.userId},
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        res.json(thought)
      }) 
      .catch((err) => res.status(400).json(err));
  }, 
// Put to update a thought by ID
  updateThought ({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $set: body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user found with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      } 
    )
  },
// Delete to remove a thought by ID
  deleteThought({params}, res) {
    Thought.findOneAndRemove({ _id: params.id })
      .then(thought => {
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
      })
      .catch((err) => res.status(400).json(err));
  },
// Post to create a reaction 
  createReaction ({params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: { reactions: body } },
        { runValidators: true, new: true }
      )
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(thought => {
        !thought
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thought)
       })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        })
  },
// Delete to pull and remove reaction by ID 
  removeReaction ({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughId },
        { $pull: { reactions: { reactionId: params.reactionId } }},
        { runValidators: true, new: true }
      )
      .then((thought) =>
        !thought 
          ? res.status(404).json({ message: "No thought found with that ID"})
          : res.json(thought)
      ) 
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
   },
};

module.exports = thoughtController; 