if (Meteor.isClient) {
  // Setup the configuration options for accounts package
  Accounts.ui.config({
    'passwordSignupFields': 'USERNAME_ONLY'
  });
  // Setup template helpers
  Template.chat.helpers({
    'username' : function() {
      return Meteor.user().username;
    },
    'messages' : function() {
      return Messages.find({});
    }
  });
  // Setup the event handlers
  Template.chat.events({
    // When the send button is clicked
    'click .send' : function(e, tmpl) {
      // Grab the value from the input box
      var message = tmpl.find('.message').value;
      // Insert that message into the Mongo collection
      Messages.insert({
        user: Meteor.user().username,
        msg: message
      });
    }
  });
}

Messages = new Mongo.Collection('messages');
