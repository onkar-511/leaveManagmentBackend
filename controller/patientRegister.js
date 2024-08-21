const patient = require('../model/patientRegister')
const { verifyToken } = require('./login')

const savePatient = async (req, res, next) => {
    try {
        const patientRegister = new patient({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mob: req.body.mob,
            department: req.body.department,
            role: req.body.role,
            files: '' // Assuming you want to store the image URL in the database
        });

        const existingUser = await patient.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }
        // await verifyToken(req.headers.authorization, process.env.secretKey,)   
        const saveData = await patientRegister.save();
        req.patient = saveData;
        // res.json(saveData);
        next();
    } catch (error) {
        console.log(error);
        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ msg: "Internal server error" });
    }

};


const getPatient = async (req, res) => {
    await verifyToken(req.headers.authorization, process.env.secretKey);
    try {
        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || 200;
        const { name, department } = req.query;
        const queryObject = {};

        // Build query object based on name and/or department
        if (name || department) {
            queryObject.$or = [];
            if (name) {
                queryObject.$or.push({ name: { $regex: name, $options: "i" } });
            }
            if (department) {
                queryObject.$or.push({ department: { $regex: department, $options: "i" } });
            }
        }

        const count = await patient.countDocuments(queryObject);
        let page = skip * limit;
        const saveData = await patient.find(queryObject).skip(page).limit(limit);
        console.log(req.query, "test query");
        res.status(200).json({ total: count, data: saveData });
    } catch (error) {
        console.log(error);
        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteStaff = async (req, res) => {
    let deleteId = req.params.id
    try {
        const deleteStaff = await patient.findByIdAndDelete(req.params.id);
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

const findSingalePatient = async (req, res) => {
    try {
        const findStaff = await patient.findById(req.params.id)
        res.status(200).json({ msg: findStaff })

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}


// const updatePatient = async (req, res) => {
//     try {

//         const patientUpdate = new patient({
//             username: req.body.username,
//             files: req.body.files
//         })
//         if (!username || !files) {
//             return res.status(400).json({ msg: 'Patient ID and image URL are required' });
//         }

//         const updatedPatient = await patientUpdate.findByIdAndUpdate(
//             username,
//             { files },
//             { new: true }
//         );

//         if (!updatedPatient) {
//             return res.status(404).json({ msg: 'Patient not found' });
//         }

//         res.json(updatedPatient);
//     } catch (error) {
//         console.error(error);

//         if (error.message === 'Authorization header is missing') {
//             return res.status(401).json({ msg: "Unauthorized: Invalid token" });
//         }

//         res.status(500).json({ msg: "Internal server error" });
//     }
// };
const updatePatient = async (req, res) => {
    try {
        const { _id, files } = req.body;  // Destructure username and files from req.body

        if (!_id || !files) {
            return res.status(400).json({ msg: 'Patient ID and image URL are required' });
        }

        const updatedPatient = await patient.findByIdAndUpdate(
            _id,           // Assuming username is the patient ID
            { files },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        res.json(updatedPatient);
    } catch (error) {
        console.error(error);

        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }

        res.status(500).json({ msg: "Internal server error" });
    }
};



module.exports = { savePatient, getPatient, deleteStaff, findSingalePatient, updatePatient };
