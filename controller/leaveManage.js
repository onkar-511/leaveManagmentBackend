const leavestatus = require('../model/leaveManage');
const staffData = require('../model/patientRegister')
const { verifyToken } = require('./login');


const addLeave = async (req, res) => {
    const leave = new leavestatus({
        reason: req.body.reason,
        staffId: req.body.staffId,
        startDate: req.body.startLeave,
        endDate: req.body.endLeave,
        status: req.body.status,
        username: req.body.username
    })
    try {
        const saveData = await leave.save();
        res.json(saveData)
    } catch (error) {
        console.log(error)
        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ msg: "Internal server error" });
    }

}

const getLeave = async (req, res) => {
    await verifyToken(req.headers.authorization, process.env.secretKey);
    try {
        const skip = Number(req.query.skip) || 0;
        const limit = Number(req.query.limit) || 200;
        const { username } = req.query;
        const queryObject = {};
        if (username) {
            queryObject.username = { $regex: username, $options: "i" };
        }
        const pipeline = [
            {
                $lookup: {
                    from: "leave-managments",
                    localField: "username",
                    foreignField: "username",
                    as: "data",
                },
            },
            {
                $match: queryObject
            },
            {
                $skip: skip * limit
            },
            {
                $limit: limit
            }
        ];

        const saveData = await leavestatus.aggregate(pipeline);
        const leaveCount = [
            {
                "$group": {
                    "_id": "$status",
                    "count": { "$sum": 1 }
                }
            },
            {
                "$group": {
                    "_id": null,
                    "counts": {
                        "$push": {
                            "k": "$_id",
                            "v": "$count"
                        }
                    },
                    "total_documents": { "$sum": "$count" }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "counts": { "$arrayToObject": "$counts" },
                    "total_documents": 1
                }
            }
        ]


        const count = await leavestatus.aggregate(leaveCount)
        console.log(req.query, "test query");
        res.status(200).json({ msg: saveData, leave_count: count });
    } catch (error) {
        console.log(error);
        if (error.message === 'Authorization header is missing') {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ msg: "Internal server error" });
    }
};


const deleteLeave = async (req, res) => {
    await verifyToken(req.headers.authorization, process.env.secretKey)
    try {
        const deleteLeave = await leavestatus.findByIdAndDelete(req.params.id);
        if (!deleteLeave) {
            res.status(404).json({ msg: "Leave not found" });
            return;
        }
        res.status(200).json({ msg: myData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const findSingaleLeave = async (req, res) => {
    await verifyToken(req.headers.authorization, process.env.secretKey)
    try {
        const findLeave = await leavestatus.findById(req.params.id)
        res.status(200).json({ msg: findLeave })

    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const updateLeave = async (req, res) => {
    const { id } = req.params;
    const { reason, staffId, startDate, endDate, status, username } = req.body
    try {
        const updatedleave = await leavestatus.findByIdAndUpdate(id, { reason, staffId, startDate, endDate, status, username }, { new: true });
        res.status(200).json(updatedleave);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addLeave, findSingaleLeave, deleteLeave, getLeave, updateLeave }
