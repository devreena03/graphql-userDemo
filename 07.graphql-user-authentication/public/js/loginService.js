function login(){
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username":document.getElementById("username").value,
            "password":document.getElementById("password").value     
        })
      }).then(r => r.json()).then(data => {
          console.log(data.success); 
          if(data.success == true){
            localStorage.setItem("token", data.token);
            window.open("/","_self"); 
          } else {
            window.alert(data.message);
          }
              
    }).catch (error => { 
        console.log(error);
        window.alert(error.message);
    });
}