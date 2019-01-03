const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require("./schemas/userSchema");

var app = express();

app.use(express.static(__dirname+'/public'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/public/view/index.html');
});

app.use('/graphql', graphqlHTTP({
    schema,           
    graphiql: true,    
}));

app.listen(4001);

console.log("Running express server on localhost:4001");