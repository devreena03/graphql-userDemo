const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');

const schema = require("./schemas/userSchema");
let auth = require('./authentication/auth');

var app = express();

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/public/view/index.html');
});
app.get("/login", function(req, res){
	res.sendFile(__dirname + '/public/view/login.html');
});

app.post('/login', auth.login);

app.use(auth.validate);
app.use('/graphql', graphqlHTTP({
    schema,           
    graphiql: true,    
}));

app.listen(4001);

console.log("Running express server on localhost:4001");