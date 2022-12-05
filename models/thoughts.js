const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => new Date(timeStamp).toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);