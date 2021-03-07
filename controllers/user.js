const { request, response } = require('express');

const getUsers = (req = request, res = response) => {

  // Query params
  const { name, apikey } = req.query;

  res.json({
    ok: true,
    msg: 'get API - controller',
    name,
    apikey
  });

};

const postUsers = (req = request, res = response) => {

  const { name, age } = req.body;

  res.json({
    ok: true,
    msg: 'post API - controller',
    name,
    age
  });

};

const putUsers = (req = request, res = response) => {

  // Parametros segmentados
  const { id } = req.params;

  res.json({
    ok: true,
    msg: 'put API - controller',
    id
  });

};

const deleteUsers = (req = request, res = response) => {

  res.json({
    ok: true,
    msg: 'delete API - controller'
  });

};

const patchUsers = (req = request, res = response) => {

  res.json({
    ok: true,
    msg: 'patch API - controller'
  });

};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}