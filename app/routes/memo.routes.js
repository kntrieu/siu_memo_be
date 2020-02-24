module.exports = (app) => {
    const memos = require('../controllers/memo.controller.js');

    // Create a new memo
    app.post('/memo', memos.create);

    // Retrieve all memos
    app.get('/memos', memos.findAll);

    // Retrieve a single memo with memoId
    app.get('/memos/:memoId', memos.findOne);

    // Update a memo with memoId
    app.put('/memos/:memoId', memos.update);

    // Delete a memo with memoId
    app.delete('/memos/:memoId', memos.delete);
}