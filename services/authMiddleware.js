const { admin } = require('./firebase.js');

const Users = require('../models/Users.js');


exports.getAuthToken = (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {

        // put the JWT in the req object
        req.authToken = (req.headers.authorization.split(' ')[1]) ? req.headers.authorization.split(' ')[1] : null;

    } else {

        return res.status(401).send({ error: "Bearer is missing" })

    }

    return next();

}

exports.checkIfAuthenticated = (req, res, next) => {
    // here getAuthToken is inside the funciton to avoid doing 
    // app.get('/url',getAuthToken,checkIfAuthenticated,myCtrl)
    // instead we do 
    // app.get('/url',checkIfAuthenticated,myCtrl)
    this.getAuthToken(req, res, async () => {

        try {

            const { authToken } = req;

            const user = await admin.auth().verifyIdToken(authToken);

            req.authId = user.uid;

            return next();

        } catch (error) {
            console.log(error)
            return res.status(401).send({ error: "your are not authorized" })
        }

    });
}


