const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// // /api/users/:id/friends
// router.route('/:id/friends').post(addFriend);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
