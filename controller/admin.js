const hodregister = require('../model/hodRegister');

const { verifyToken } = require('../controller/login');

const allAdminData = async (req, res) => {
    try {
        const combinedData = await hodregister.aggregate([
            {
                $lookup: {
                    from: 'leave-managments', // Use the name of the collection as a string
                    let: { dep: "$department" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$department', '$$dep'] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                department:1,
                                name:1
                            }
                        }
                    ],
                    as: 'staffData'
                }
            }
        ]).exec();
        res.status(200).json({ msg: combinedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { allAdminData };

