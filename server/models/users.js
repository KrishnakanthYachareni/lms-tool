const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  hasProject: {
    type: Boolean,
    default: false
  },
  hasTeam: {
    type: Boolean,
    default: false
  },
});

// export model user with AdminUserSchema
module.exports = mongoose.model("users", UserSchema);
