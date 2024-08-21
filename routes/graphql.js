const expressRoute = require('express')
const router = expressRoute.Router();
const startGraphQLServer = require('../middleware/graphquel')
const { expressMiddleware } = require("@apollo/server/express4");

(async () => {
    const graphqlMiddleware = await startGraphQLServer();
    router.route("/graphql").get(graphqlMiddleware);
})();

module.exports = router;
