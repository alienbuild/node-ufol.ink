const express = require('express');
const router = express.Router();

// @route   GET api/shorten/test
// @desc    Test shortening API
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Redirect Test API working"}));

// @route   GET api/redirect
// @headers hash
// @desc    Redirect user
// @access  Public
router.get('/',(req, res) => {
    const hash = req.headers.hash;
    URL.findOne({ _id: hash }, function(err,doc){
        if (doc) {
            res.json({ url: doc.url })
        } else{
            res.json({ url: 'not found'})
        }
    });
});

module.exports = router;
