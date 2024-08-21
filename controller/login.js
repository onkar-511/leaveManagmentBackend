const patient = require('../model/patientRegister');
const hod = require('../model/hodRegister')
const jwt = require('jsonwebtoken');


const loginAuth = async (req, res) => {
console.log(req,'-----------')
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.roleSelect
    console.log(role, "role -------------")
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        let user;
        
        if (role == 'Staff') {
            console.log('test ---- ')
            user = await patient.findOne({ username, password });
            console.log(user,'user')
        } else if (role == 'HOD') {
            user = await hod.findOne({ username, password });
            console.log(user,"user")
        }
        if (!user) {
            return res.status(200).json({ success: false, message: 'User not found' });
        }
        console.log('test')
        // Assuming _id is the field for the user's ID in the database
        const token = jwt.sign({ userID: user._id }, process.env.secretKey, { expiresIn: '10h' });

        res.status(200).json({
            success: true,
            token,
            user: {
                username: user.username,
                email: user.email,
                name: user.name,
                mob: user.mob,
                department: user.department,
                role: user.role,
                id: user._id
            }
        });
    } catch (error) {
        console.error("Status 500:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const verifyToken = async (authHeader, secretKey) => {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        throw new Error('Authorization header is missing');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded; // Return the decoded user object
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { loginAuth, verifyToken };