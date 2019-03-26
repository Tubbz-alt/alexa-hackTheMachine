'use strict';

var Alexa = require('alexa-sdk');

if ('undefined' === typeof process.env.DEBUG) {
    Alexa.appId = '...';
    var AWS = require('aws-sdk');
    var dyn = new AWS.DynamoDB({endpoint: new AWS.Endpoint("http://localhost:8000")});
    Alexa.dynamoDBClient = dyn;
  }

var handlers = {

  'LaunchRequest': function() {
 
    this.response.speak('Welcome To Hack The Machine Team 2')
    this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
    this.response.speak('Bye, See You again');
    this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
    this.response.speak('Bye, See you again');
    this.emit(':responseReady');
  },

  // Save state
  'SessionEndedRequest': function() {
    console.log('session ended!');
    this.emit(':saveState', true);
  }

};


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  //alexa.dynamoDBTableName = 'TableName';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

