const mongoose = require('mongoose');

const MemoSchema = mongoose.Schema({
    id: String,
    name: String,
    created_date: String,
    content: String,
    user_id: String,
    color: String

}, {
    timestamps: true
});

module.exports = mongoose.model('memos', MemoSchema);