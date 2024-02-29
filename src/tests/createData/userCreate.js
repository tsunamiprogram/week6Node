const User = require("../../models/User")

const userCreate = async () => {
    await User.create(
        {
            firstName: "Fernando",
            lastName: "de jesus",
            email: "fernando@gmail.com",
            password: "1234",
            phone: "+123456"

        }
    )}

    module.exports = userCreate