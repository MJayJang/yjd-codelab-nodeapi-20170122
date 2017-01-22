const models = require('../../models');

const index = (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(offset)) return res.status(400).end();

  models.User.findAll({offset, limit}).then(users => {
    res.json(users);
  });
};
const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({where: {id}}).then(user => {
    if(!user) return res.status(404).end();
    res.json(user);
  });
};
const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  models.User.create({name})
      .then(user => res.json(user))
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end();
        }
        res.status(500).end();
      });
};
const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (name === undefined) return res.status(400).end();

  const user = users.filter(user => user.id === id)[0];
  if (user === undefined) return res.status(404).end();

  const confilct = users.filter(user => user.name === name).length > 0;
  if (confilct) return res.status(409).end();

  user.name = name;
  res.json(user);
};
const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter(user => user.id !== id);
  res.status(204).end();
}

module.exports = {index, show, create, update, destroy};
