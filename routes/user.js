const { Router } = require('express');
const router = Router();

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
} = require('../controllers/user');

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);

router.patch('/', patchUsers);

module.exports = router;