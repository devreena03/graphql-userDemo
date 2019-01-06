let jwt = require('jsonwebtoken');
const key = "nodejwtdemoapp"

let validate = (req, res, next) => {
  let token = req.headers['my-access-token'] || req.headers['authorization'];
  console.log("token : "+ token);
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied, Please login to system'
    });
  }
};

let login = (req, res)  => {
     // console.log(req);
      let username = req.body.username;
      let password = req.body.password;
      let dbUsername = 'admin';
      let dbPassword = 'password';
  
      if (username && password) {
        if (username === dbUsername && password === dbPassword) {
            console.log(username+" : "+password);
          let token = jwt.sign({username: username}, key,
            { 
                expiresIn: '4h' // expires in 4 hours
            }
          );
          console.log(token);
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
            res.status(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication failed! Username or password is empty'
        });
    }
}
  
module.exports = {
    validate: validate,
    login: login
}