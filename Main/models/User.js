const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    userId: {
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
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
    },
    id: false,
  }
);

const Username = db.model('username', userSchema);

const username = new Username();
username.save(function(error) {
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');

  error = username.validateSync();
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');
});

module.exports = userSchema;
