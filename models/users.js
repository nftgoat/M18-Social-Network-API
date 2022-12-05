const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { 
        type: String,
        unique: true,
        required: true,
        trim: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
