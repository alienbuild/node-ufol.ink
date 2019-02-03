const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

// Load URL model
const URL = require('../../models/Urls');

// @route   GET api/shorten/test
// @desc    Test shortening API
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Shortening API working"}));

// @route   POST api/shorten
// @desc    Post a url to shorten
// @access  Public
router.post('/',(req, res, next) => {
    // Did you get the req?
    console.log(req.body);
    // Grab and store the url
    if (req.body.url) urlData = req.body.url;
    console.log('URL is: ', urlData);
    // Check if URL already exists
    URL.findOne({url: urlData}, function(err, doc) {
        if(doc) {
            console.log('entry found in db');
            res.send({
                url: urlData,
                hash: url._id,
                status: 200,
                statusTxt: 'OK'
            });
        } else {
            console.log('entry NOT found in db, saving new');
            var url = new URL({
                _id: uniqid(),
                url: urlData
            });
            url.save(function(err) {
                if(err) return console.error(err);
                res.send({
                    url: urlData,
                    hash: url._id,
                    status: 200,
                    statusTxt: 'OK'
                });
            });
        }
    });

});

module.exports = router;
