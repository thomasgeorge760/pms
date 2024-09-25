
const Roles = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});

const roleValidation = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

module.exports = { Roles, roleValidation };