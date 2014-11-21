var mongoose = require('mongoose');

module.exports = mongoose.model('Answers', {
    oauthID: Number,
    answer: String
});