const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: "user"
  //   },
  name: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    require: true,
    unique: true
  },
  address: {
    street: {
      type: String
    },
    aptNo: String,
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: String,
    country: {
      type: String
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Member = mongoose.model("member", UserSchema);
