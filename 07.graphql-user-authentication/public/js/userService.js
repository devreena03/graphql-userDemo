function allUsers(){
    fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token"),
        },
        body: JSON.stringify({query:  `{ 
          users { 
              id 
              firstName 
            } 
          }`
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log(data); 
          document.getElementById("outputData").value = JSON.stringify(data,null,2); 
        });
}

function userById(){
  var id = parseInt(document.getElementById("userId").value);
  console.log(id);
  var query = `query User($id: Int!) {
    user(id: $id) {id firstName}
  }`;
  fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query,
        variables:{id} 
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data); 
        document.getElementById("outputData").value = JSON.stringify(data,null,2); 
      });
}

function userWithRole(){
  var id = document.getElementById("userId").value;
  console.log(id);
  fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token"),
      },
      body: JSON.stringify({query: "{ \
        user (id: "+id+") { \
          id \
          firstName \
          roles \
            { \
              id \
              name \
            } \
          }\
        }"
    })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data); 
        document.getElementById("outputData").value = JSON.stringify(data,null,2); 
      });
}