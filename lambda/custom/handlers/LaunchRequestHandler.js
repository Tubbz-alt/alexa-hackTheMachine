
const dbHelper = require('./dbHelper');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const userID = handlerInput.requestEnvelope.context.System.user.userId;
      let speechText = '';

      dbHelper.getUser(userID).then((data) => {
        if (data) {
          var username = data.username;//fetch from data
          speechText = 'Welcome' + userName + 'To Hack The Machine Team 2';
          let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
          sessionAttributes.userName = username;
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
          return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        } else {
          speechText = 'Welcome To Hack The Machine Team 2. May I know your name please'
          return responseBuilder
            .speak(speechText)
            .reprompt('Sorry, I did not get your name please speak again')
            .getResponse();
        }
      })
        .catch((err) => {
          console.log("Error occured while getting user", err);
          speechText = "Facing some technical issues.Please Try again later!"
          return responseBuilder
            .speak(speechText)
            .getResponse();
        }) 
    },
  };

const NameRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'NameRequestIntent';
  },
  handle(handlerInput) {
    var loggedusername;
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    if (slots.username.value && slots.username.value !== "?") {
      loggedusername = slots.username.value;
    }
    if (loggedusername) {
      const userID = handlerInput.requestEnvelope.context.System.user.userId;
      dbHelper.addUser(userID, loggedusername).then((data) => {

        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.userName = loggedusername;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder.speak('Welcome' + loggedusername + 'To Hack The Machine Team 2')
          .reprompt('Welcome' + loggedusername + 'To Hack The Machine Team 2')
          .getResponse();

      })
        .catch((err) => {
          console.log("Error occured while getting user", err);
          speechText = "Facing some technical issues.Please Try again later!"
          return responseBuilder
            .speak(speechText)
            .getResponse();
        })
    } else {
      return handlerInput.responseBuilder.speak('Sorry, I did not get your name please speak again')
        .reprompt('Sorry, I did not get your name please speak again')
        .getResponse();
    }  
  },
};

  module.exports = {
    LaunchRequestHandler, NameRequestHandler
  }