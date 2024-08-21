require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const connectDB = require('./db/connect');
const routes = require('./routes/patientRegister');
const logger = require('./db/logger');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const User = require('./model/patientRegister');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(req.body);
    let oldSend = res.send;
    res.send = function (data) {
        try {
            logger.info(JSON.parse(data));
        } catch (error) {
            logger.info(data); // Log data directly if it's not JSON
        }
        oldSend.apply(res, arguments);
    };
    next();
});

app.use('/api', routes);
app.get("/", (req, res) => {
    res.send("hi i am live");
});

app.use(fileUpload({
    useTempFiles: true
}));

async function initGraphQL(app) {
    const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        email: String!
        mob: String!
        department: String!
        role: String!
        files: String!
    }

    type Query { 
        hello: String,
        hii:String,
        users: [User]
    }

    type Mutation {
        addUser(
            name: String!,
            username: String!,
            password: String!,
            email: String!,
            mob: String!,
            department: String!,
            role: String!,
            files: String!
        ): User
    }
    `;

    const resolvers = {
        Query: {
            hello: () => 'hey i am graphql',
            hii: () => 'hey i graphql',
            users: async () => {
                return await User.find();
            },
        },
        Mutation: {
            addUser: async (_, { name, username, password, email, mob, department, role, files }) => {
                const newUser = new User({ name, username, password, email, mob, department, role, files });
                await newUser.save();
                return newUser;
            },
        },
    };

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await gqlServer.start();
    app.use('/graphql', expressMiddleware(gqlServer));
}

const start = async () => {
    try {
        await connectDB();
        // console.clear();
        // await initGraphQL(app);
        logger.log('info', `${PORT} yes i connected`);
        app.listen(PORT, () => {
            console.log(`${PORT} yes i connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start(); // Call the start function to begin execution
