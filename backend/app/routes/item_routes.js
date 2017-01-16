const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.route('/')
  .get(function(req, res) {
    Item.find(function(err, items) {
      if (err) {
        res.send(err);
      }
      res.json(items);
    });
  })

  .post(function(req, res) {
    let item = new Item();
    item.title = req.body.title;

    item.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Item created' });
    });
  });

router.route('/:item_id')
  .get(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  })
  .put(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
      if (err) {
        res.send(err);
      }
      item.title = req.body.title;

      item.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Item updated!' });
      });
    })
  })
  .delete(function(req, res) {
    Item.remove({_id: req.params.item_id}, function(err, item) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  })

module.exports = router;