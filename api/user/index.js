const router = require('express').Router();

let users = [{
  id: 1,
  name: 'Alice'
}, {
  id: 2,
  name: 'Bek'
}, {
  id: 3,
  name: 'Chris'
}];

router.get('/:id', (req, res)=>{
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const user = users.filter(u => u.id === id)[0];
  if(user === undefined) return res.status(404).end();

  res.json(user);
});
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(offset)) return res.status(400).end();

  const results = users.filter((user, idx)=> {
    return idx < limit;
  });
  res.json(results);
});
router.post('/', (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const foundUsers = users.filter(user => user.name === name);
  if (foundUsers.length > 0) return res.status(409).end();

  const id = users.reduce((max, user) => {
    return user.id > max ? user.id : max;
  }, 0) + 1;
  const user = {name, id};
  users.push(user);
  res.json(user);
})
router.put('/:id', (req, res) => {
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
})
router.delete('/:id', (req, res)=>{
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

module.exports = router;
