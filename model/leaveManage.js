const mongoose = require('mongoose');

const manageLeave = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    staffId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('leave-status', manageLeave)