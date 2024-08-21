const swaggerAutogen = require('swagger-autogen')();
const rout = require('./routes/patientRegister')

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: process.env.port 
};

const outputFile = './swagger-output.json';
const routes = ['./routes/patientRegister'];

swaggerAutogen(outputFile,routes,doc)