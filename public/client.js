var img = function(img) {
    cat.insert({cat: img + '.svg'});
    console.log(cat.find({}).fetch()[cat.find({}).fetch().length-1]);
    document.getElementById('faceimg').setAttribute('src', cat.find({}).fetch()[cat.find({}).fetch().length-1].cat);
}

var logdb = function() {
  var catcollection = [];
  for(x=0;x<=cat.find({}).fetch().length-1;x++){
    catcollection.unshift(cat.find({}).fetch()[x].cat);
  }
  catcollection.unshift('Latest =>');
  catcollection.push('<= Earliest');
  console.log('%c ' + catcollection, 'color:blue;');
  return catcollection[1];
}

var init = function(){
  if(document.cookie != null && document.cookie != '' && document.cookie != -1){
    document.getElementsByTagName('body')[0].style.display = 'inline';
    var latestcat = cat.find({}).fetch()[cat.find({}).fetch().length-1];
    document.getElementById('faceimg').setAttribute('src', logdb()[1]);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('faceimg').style.display = 'block';

    setInterval(function(){
      if(cat.find({}).fetch()[cat.find({}).fetch().length-1] != document.getElementById('faceimg').getAttribute('src')){
        document.getElementById('faceimg').setAttribute('src', cat.find({}).fetch()[cat.find({}).fetch().length-1].cat);
      }
    }, 1000);
  }
  else {
    window.location = '/login';
  }
}