# Client Testing

### Curl request
```
curl -X POST \
  http://localhost:4001/graphql \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "query": "{ users {id firstName login} }"
}'
```
### Postman testing
-> Method type: post
-> URL: <base-url>/ graphql
-> Header: Content-Type - application/json
-> Body: 
   1) row: Json
   2) payload: {
 
          "query": "{ users {id firstName login} }"
         
}
  
### Ajax(Jquery)
```
var request = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:4001/graphql",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "processData": false,
  "data": "{\n    \"query\": \"{ users {id firstName login} }\"\n}"
}

$.ajax(request).done(function (response) {
  console.log(response);
});
 ``` 
### PHP Curl
```
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "4001",
  CURLOPT_URL => "http://localhost:4001/graphql",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n    \"query\": \"{ users {id firstName login} }\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```
### NodeJs
```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:4001/graphql',
  headers: 
   { 
     'Content-Type': 'application/json' },
  body: { query: '{ users {id firstName login} }' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
### Objective C
```
import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"Content-Type": @"application/json" };
NSDictionary *parameters = @{ @"query": @"{ users {id firstName login} }" };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:4001/graphql"]];
[request setHTTPMethod:@"POST"];
[request setAllHTTPHeaderFields:headers];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];
```
### Swift

```
import Foundation

let headers = [
  "Content-Type": "application/json",
  "cache-control": "no-cache"
]
let parameters = ["query": "{ users {id firstName login} }"] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "http://localhost:4001/graphql")! as URL)
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
  ``` 
