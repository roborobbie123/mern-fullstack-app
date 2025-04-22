const express = require('express');

const router = express.Router();

const data = [{id: 'u1', description: 'hello world'}];

router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = data.find(data => data.id === userId);
    res.json(place);
})

module.exports = router;