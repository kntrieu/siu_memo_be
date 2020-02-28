const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const memos = require('../controllers/memo.controller.js');


let initAPIs = (app) => {
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });

    router.post("/login", AuthController.login);
    router.post("/refresh-token", AuthController.refreshToken);
    // Retrieve all memos
    router.get('/memos', memos.findAll);

    router.use(AuthMiddleWare.isAuth);
    // Create a new memo
    router.post('/memo', memos.create);

    // Retrieve a single memo with memoId
    router.get('/memos/:memoId', memos.findOne);

    // Update a memo with memoId
    router.put('/memos/:memoId', memos.update);

    // Delete a memo with memoId
    router.delete('/memos/:memoId', memos.delete);
    return app.use("/", router);
}  


module.exports = initAPIs;