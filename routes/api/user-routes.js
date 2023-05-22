const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    removeFriend
} = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

router.route('/:id/friends/friendId').post(createFriend).delete(removeFriend);

module.exports = router; 