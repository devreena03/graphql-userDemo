const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require("./schemas/userSchema");
const root = require("./resolvers/userResolver");

var app = express();

app.use('/graphql', graphqlHTTP({
    schema,          
    rootValue: root,  
    graphiql: true,    
}));

app.listen(4001);

console.log("Running express server on localhost:4001");