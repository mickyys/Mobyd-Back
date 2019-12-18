const {
    User
} = require('../user/user');

const Status = require('../enums/status.enums');
const columnsDoctors = "_id fullName name lastName email className";

module.exports.columnsDoctors = columnsDoctors;

const getDoctors = async (req, res) => {
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

const getDoctorForName = async (name) => {
    const user = await User.findOne({
        status: Status.active,
        roles: { $all: ["Doctor"] },
        name : name
    })
    .select(columnsDoctors)
    ;

    return user;
}

module.exports = {
    getDoctors,
    getDoctorForName
}