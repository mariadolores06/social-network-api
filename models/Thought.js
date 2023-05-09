const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema( 
    { 
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      ractionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt:{
        type: Date,
        default: Date.now,
        get: (time) => format_date(time)
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
      required: "XXX",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {

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