// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
// const { json } = require('body-parser');

// const typeDefs = `
//   type Query { 
//     hello: String
//   }
// `;

// const resolvers = {
//     Query: {
//         hello: () => 'hey i am graphql',
//     },
// };

// const gqlServer = new ApolloServer({
//     typeDefs,
//     resolvers,
// });

// const startGraphQLServer = async () => {
//     await gqlServer.start();
//     return expressMiddleware(gqlServer);
// };

// const graphqlMiddleware = async (req, res, next) => {
//     try {
//         const middleware = await startGraphQLServer();
//         middleware(req, res, next);
//     } catch (error) {
//         console.error("Error initializing GraphQL server:", error);
//         res.status(500).json({ error: "Failed to initialize GraphQL server" });
//     }
// };

// module.exports = graphqlMiddleware;

const graphqlMiddleware = async (req, res, next) => {
    try {
        const gqlServer = new ApolloServer({
            typeDefs: `
                type Query { 
                  hello: String
                }
              `,
            resolvers: {
                Query: {
                    hello: () => 'hey i am graphql',
                }
            },
        });
        await gqlServer.start();
    } catch (error) {
        //         console.error("Error initializing GraphQL server:", error);
        //         res.status(500).json({ error: "Failed to initialize GraphQL server" });
        //     }
    }
}

module.exports = graphqlMiddleware