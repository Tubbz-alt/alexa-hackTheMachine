
const dbHelper = require('./dbHelper');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const userID = handlerInput.requestEnvelope.context.System.user.userId;
    let speechText = '';

    let data = await dbHelper.getUser(userID).catch((err) => {
      console.log("Error occured while getting user", err);
      speechText = "Facing some technical issues.Please Try again later!"
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    });
    if (data.length > 0) {
      var username = data[0].username;//fetch from data
      speechText = 'Welcome ' + username + ' To Soft Widget Bot';
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.userName = username;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('You can say help me to know more.')
        .getResponse();
    } else {
      speechText = 'Welcome To Soft Widget Bot. May I know your name please'
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('Sorry, I did not get your name please speak again')
        .getResponse();
    }
  },
};

const NameRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'NameRequestIntent';
  },
  async handle(handlerInput) {
    var loggedusername;
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    if (slots.username.value && slots.username.value !== "?") {
      loggedusername = slots.username.value;
    }
    if (loggedusername) {
      const userID = handlerInput.requestEnvelope.context.System.user.userId;
      let data = await dbHelper.addUser(userID, loggedusername).catch((err) => {
        console.log("Error occured while getting user", err);
        speechText = "Facing some technical issues.Please Try again later!"
        return responseBuilder
          .speak(speechText)
          .getResponse();
      })

        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.userName = loggedusername;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder.speak('Welcome' + loggedusername + 'To Hack The Machine Team 2')
          .reprompt('You can say help me to know more.')
          .getResponse();
    } 
    else {
      return handlerInput.responseBuilder.speak('Sorry, I did not get your name please speak again')
        .reprompt('Sorry, I did not get your name please speak again')
        .getResponse();
    }
  },
};

module.exports = {
  LaunchRequestHandler, NameRequestHandler
}