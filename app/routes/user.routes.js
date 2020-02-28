module.exports = (app) => {
    const AuthController = require('../controllers/AuthController');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });

    app.post('/login', AuthController.login);
    app.post('/refresh-token', AuthController.refreshToken);

}