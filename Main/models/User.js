const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 12,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address."],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'friend',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

const user = model('user', userSchema);

// const username = new Username();
// username.save(function(error) {
//   assert.equal(error.errors['name'].message,
//     'Path `name` is required.');

//   error = username.validateSync();
//   assert.equal(error.errors['name'].message,
//     'Path `name` is required.');
// });

module.exports = user;
