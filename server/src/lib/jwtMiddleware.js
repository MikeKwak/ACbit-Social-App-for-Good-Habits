import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//extends JWT if exists in the request, if not, does nothing
const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        console.log('there is no token');
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }
        return next();
    } catch (e) {
        return next();
    }
};

export default jwtMiddleware;
