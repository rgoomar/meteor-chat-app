# Meteor Intro Chat Application

## Statistics

Total lines of code including comments and line spacing:  
79 (49 from HTML and 30 from JavaScript)

## Instructions

Create the Meteor app  
`meteor create chat`

Add in a package to get basic password-based authentication  
`meteor add accounts-password`

Add basic CSS styling with Bootstrap (note: it’s an official package)  
`meteor add twbs:bootstrap`

Package to give you a basic login / sign up form  
`meteor add ian:accounts-ui-bootstrap-3`

#### Building out the HTML

Setup authentication navigation bar
```html
<!-- Top Navigation Bar -->
<div class="navbar navbar-default" role="navigation">
  <div class="navbar-header">
    <a class="navbar-brand" href="#">Chat App</a>
  </div>
  <div class="navbar-collapse collapse">
    <ul class="nav navbar-nav navbar-right">
      <!-- Add the template given by the accounts-ui package -->
      {{> loginButtons}}
    </ul>
  </div>
</div>
```

Setup the chat area template
```html
<template name="chat">
  {{#if currentUser }}
    <h3>Username: {{username}}</h3>
  {{/if}}
  <table class="table">
    <thead>
      <th>Username</th>
      <th>Message</th>
    </thead>
    {{#each messages}}
    <tr>
      <td>{{user}}</td>
      <td>{{msg}}</td>
    </tr>
    {{/each}}
  </table>
  {{#if currentUser }}
    <input type="text" class="form-control message" placeholder="message" />
    <button class="btn btn-primary send">Send Message</button>
  {{/if}}
</template>
```

Create the main container and import the chat template
```html
<!-- Main Area -->
<div class="container">
  <h1>Welcome to Meteor!</h1>
  <!-- Import the chat template -->
  {{> chat }}
</div>
```

#### Building out the JavaScript File

Ensure the code is client-only
```javascript
if (Meteor.isClient) {
  // Code goes here
}
```

Add in authentication configuration options
```javascript
// Setup the configuration options for accounts package
Accounts.ui.config({
  'passwordSignupFields': 'USERNAME_ONLY'
});
```

Setup the template helpers
```javascript
// Setup template helpers
Template.chat.helpers({
  'username' : function() {
    return Meteor.user().username;
  },
  'messages' : function() {
    return Messages.find({});
  }
});
```

Setup template event handlers
```javascript
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
```

We cant store data without a Mongo collection, so lets create it  
NOTE: Have it outside of the `Meteor.isClient` statement because you want the collection on both the client and server  
```javascript
Messages = new Mongo.Collection('messages');
```


Lets run the server, then open a browser and go to http://localhost:3000
```
meteor
```

Try making changes in your Meteor application and watch it reload the browser instantly!
