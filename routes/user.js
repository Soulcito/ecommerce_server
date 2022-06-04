const router = require('express').Router();

// routes

router.get('/user', (req, res, next) => {
   res.json({
      data: 'Hey you hit user API endpoint'
   });
});


module.exports = router;

