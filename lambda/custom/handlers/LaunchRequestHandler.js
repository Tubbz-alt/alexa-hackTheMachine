
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
    var loggedusername;
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    if (slots.username.value && slots.username.value !== "?") {
      loggedusername = slots.username.value;
    }
    if (loggedusername) {
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.userName = loggedusername;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      return handlerInput.responseBuilder.speak('Welcome' + loggedusername + 'To Hack The Machine Team 2')
        .reprompt('Welcome' + loggedusername + 'To Hack The Machine Team 2')
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