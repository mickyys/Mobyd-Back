const {
    User
} = require('../user/user');

const Status = require('../enums/status.enums');
const columnsDoctors = "_id fullName name lastName email";

module.exports.columnsDoctors = columnsDoctors;

module.exports.getDoctors = async (req, res) => {
    const users = await User.find({
        status: Status.active,
        roles: {
            $all: ["Doctor"]
        }
    }).sort("lastName")
    .select(columnsDoctors)
    ;

    res.send(users);
}