const express = require('express');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const {execute, subscribe} = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const bodyParser = require('body-parser');

const  schema  = require("./schemas/userSchema");

var app = express();
var PORT = 4000;

const server = createServer(app);
server.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
    new SubscriptionServer({ schema, execute, subscribe }, { server, path: '/subscriptions' });
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema 
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));
