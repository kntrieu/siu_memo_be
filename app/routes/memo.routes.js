module.exports = (app) => {
    const memos = require('../controllers/memo.controller.js');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });
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