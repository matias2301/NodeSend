const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

module.exports = (req, res, next ) => {
    
    const authHeader = req.get('Authorization');

    if(authHeader){
        const token = header.split(' ')[1];

        try {
            const user = jwt.verify( token, process.env.SEED );
            req.user = user;
        } catch (error) {
            res.json({
                status: 400,
                msj: 'Invalid Token'
            });
        }

    }
    return next();
}
