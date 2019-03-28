
const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
      let userName = sessionAttributes.userName
      let speechText = '';
      if(userName)
      {
        speechText = 'Welcome' + userName + 'To Hack The Machine Team 2';
      }  
      else
      {
        sessionAttributes = {
          'userName': '',
          'orders': [{}]
        }
        speechText = 'Welcome To Hack The Machine Team 2. May I have your name please'
      }

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      return handlerInput.responseBuilder.speak(speechText)
      .reprompt('Sorry, I did not get your name please speak again')
      .getResponse();
      
    },
  };

const NameRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'NameRequestIntent';
  },
  handle(handlerInput) {
    var username;
    if (request.intent.slots.user_name.value && request.intent.slots.user_name.value !== "?") {
      username = request.intent.slots.user_name.value;
    }
    if (username) {
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.userName = username;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder.speak('Welcome' + username + 'To Hack The Machine Team 2')
        .reprompt('Welcome' + username + 'To Hack The Machine Team 2')
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