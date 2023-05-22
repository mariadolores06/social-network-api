const { Schema, model } = require("mongoose");
const dayjs = require('dayjs');

const reactionSchema = new Schema( 
    { 
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      ractionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt:{
        type: Date,
        default: dayjs(),
        get: value => dayjs(value).format('MMM DD, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false
    }
);
  
const thoughtSchema = new Schema( 
  { 
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: dayjs(),
      get: value => dayjs(value).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;