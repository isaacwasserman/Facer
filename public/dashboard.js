  var nname = getCookie('facernname');
  var userid = getCookie('facerid');
  var groupnames = [];

var getCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var forit = groups.find({whitelist: nname}).fetch();
console.log(forit);

var compilegroupnames = function(){
  
  for(x = 0; x < forit; x++){
    accounts.update(id: {$eq: userid}}, {$addToSet: {groups: groups.find({whitelist: nname}).fetch()[x].groupname}});
    
    console.log('Hello');
    
    
  }
  console.log('Added: ' + accounts.find({nname: nname}).fetch()[0]);
}
