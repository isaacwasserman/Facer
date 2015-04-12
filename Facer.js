Router.map(function(){
  this.route('home', {path: '/'});
  this.route('group', {path: '/group'});
  this.route('loader', {path: '/loader'});
  this.route('login', {path: '/login'});
  this.route('signup', {path: '/signup'});
});

//Obsolete
cat = new Mongo.Collection('cats');

//User Credentials
accounts = new Mongo.Collection('accounts');

//Cat Sharing Groups
//Contains Cats, and nnames
groups = new Mongo.Collection('groups');

if (Meteor.isClient) {
  Template.home.helpers({
    people: groups.find({}).whitelist
  });
}

if (Meteor.isServer) {
  accounts._ensureIndex({nname: 1}, {unique: 1});
  accounts._ensureIndex({email: 1}, {unique: 1});
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllCats: function() {
        return cat.remove({});
      }

    });
  });
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllAccounts: function() {
        return accounts.remove({});
      }
    });
  });
  Meteor.startup(function() {
    return Meteor.methods({
      addusergroups: function(user, groups) {
        return accounts.update({nname: {$eq: user}}, {$addToSet: {groups: group}});
      }
    })
  });
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllGroups: function() {
        return groups.remove({});
      }
    });
  });
  
  Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: text
    });
  }
});
}