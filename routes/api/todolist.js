const express = require('express');
const {createEntry} = require('../../DataAccess/todolist');
const {getEntry} = require('../../DataAccess/todolist');
const router = express.Router();

router.post('/', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await createEntry(req.body); 
             res.send(data);
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
       };
});

router.get('/', async function(req, res, next) {
    try {
          console.log("Got it!")
          const data = await getEntry(); 
          res.send(data);        
    } catch (err) {
          console.log(err);
          res.send(500, "Error-Internal Server Issue. EPIC FAIL.");
    };
});

module.exports = router;