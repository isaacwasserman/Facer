var noholder = function(input){
  document.getElementById('input' + input).setAttribute('placeholder', '');
}

var submit = function(){
  var email = document.getElementById('input1').value;
  var password = document.getElementById('input2').value;
  if(accounts.find({email: email}).fetch().length == 0){
      document.getElementById('input1').style.backgroundColor = 'red';
      document.getElementById('input2').style.backgroundColor = 'red';
  }
  if(accounts.find({email: email}).fetch()[0].pwd == password){
    document.cookie='faceremail=' + email;
    document.cookie='facerpwd=' + password;
    document.cookie='facernname=' + accounts.find({email: email}).fetch()[0].nname;
    document.cookie='facerid=' + accounts.find({nname: getCookie('facernname')}).fetch()[0]._id;
    console.log(document.cookie);
    window.location = '/';
  }
  else {
    document.getElementById('input1').style.backgroundColor = 'red';
    document.getElementById('input2').style.backgroundColor = 'red';
  }
}

var submitsignup = function(){
  var fname = document.getElementById('signup-fname').value;
  var nname = document.getElementById('signup-nname').value;
  var email = document.getElementById('signup-email').value;
  var pwd = document.getElementById('signup-password').value;
  
  if(fname != '' && nname != '' && email != '' && pwd != ''){
    var usernum = accounts.find({}).fetch().length + 1;
    accounts.insert({fname: fname, nname: nname, email: email, pwd: pwd, usernum: usernum});
    console.log(accounts.find({}).fetch()[accounts.find({}).fetch().length-1]);
    window.location = '/login';
  }
  else {
    document.getElementById('signup-fname').style.backgroundColor = 'red';
    document.getElementById('signup-nname').style.backgroundColor = 'red';
    document.getElementById('signup-email').style.backgroundColor = 'red';
    document.getElementById('signup-password').style.backgroundColor = 'red';
  }
}

var getCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

