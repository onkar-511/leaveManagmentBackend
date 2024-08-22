const monngoose = require('mongoose')
const { schema } = require('./patientRegister')

const moongschema = new monngoose.Schema({
subject:{
    type: String,
    required: true,
},
subjectId :{
    type: String,
    required: true,
}
})

module.exports = monngoose.model('professor',moongschema)