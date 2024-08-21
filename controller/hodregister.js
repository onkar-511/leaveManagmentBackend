const hodregister = require('../model/hodRegister')

// const { verifyToken } = require('./login')


const savehod = async (req, res) => {

    const hodRegister = new hodregister({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mob: req.body.mob,
        department: req.body.department,
        role: req.body.role,
        img: req.body.img,
    })
    console.log(hodRegister,"hodRegister")
    let username = req.body.username
    let department = req.body.department
    const existingUser = await hodregister.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ msg: 'Username is already taken' });
    }
    const existingDepartment = await hodregister.findOne({ department });

    if (existingDepartment) {
        return res.status(400).json({ msg: 'Department is already taken' });
    }
    try {
        // await verifyToken(req.headers.authorization, process.env.secretKey,)
        const saveData = await hodRegister.save();
        res.json(saveData)
    } catch (error) {
        console.log(error)
        // if (error.message === 'Authorization header is missing') {
        //     return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        // }
        res.status(500).json({ msg: "Internal server error" });
    }
}


const gethod = async (req, res) => {
    // await verifyToken(req.headers.authorization, process.env.secretKey,)
    try {
        const skip = Number(req.query.skip) || 1;
        const limit = Number(req.query.limit) || 200;
        const { name } = req.query;
        const queryObject = {};
        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }
        let page = (skip - 1) * limit;
        const saveData = await hodregister.find(queryObject).skip(page).limit(limit);
        console.log(req.query, "test query")
        res.status(200).json({ msg: saveData })
    } catch (error) {
        console.log(error)
        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ msg: "Internal server error" });
    }
}

const deletehod = async (req, res) => {
    let deleteId = req.params.id
    try {
        const deleteStaff = await hodregister.findByIdAndDelete(req.params.id);
        if (!deleteStaff) {
            res.status(404).json({ msg: "Staff not found" });
            return;
        }
        res.status(200).json({ msg: myData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const findSingalehod = async (req, res) => {
    try {
        const findStaff = await hodregister.findById(req.params.id)
        res.status(200).json({ msg: findStaff })

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { deletehod, findSingalehod, gethod, savehod };