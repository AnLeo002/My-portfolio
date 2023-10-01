
function login(e){
  e.preventDefault();

  class User{
    username;
    password;
  
    constructor(username,password){
      this.username=username;
      this.password=password;
    }
    get username(){
      return this.username
    }
    get password(){
      return this.password
    }
  }
  

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username == '' || password == ''){
    alert("por favor ingrese los datos completos")
  }else{
    const userLog = new User(username,password);
    const us = JSON.stringify(userLog);

    console.log( typeof us )
    console.log(typeof JSON.parse(us))

    fetch("http://localhost:8080/login",{
      method:'POST',
      body:`{"username":"${username}","password":"${password}"}`,
      credentials:'include',
      headers:{"Content-type":"application/json"},
      
    })
      .then(res=>res.json())
      .then(res=>console.log(res))

  }



}

document.getElementById('submit').addEventListener('click',login)