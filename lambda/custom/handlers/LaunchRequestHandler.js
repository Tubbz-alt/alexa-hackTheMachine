
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

  module.exports = {
    LaunchRequestHandler
  }