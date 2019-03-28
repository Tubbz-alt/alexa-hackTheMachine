
const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
      let userName = sessionAttributes.userName
      if(userName)
      {
        return handlerInput.responseBuilder.speak('Welcome' + userName + 'To Hack The Machine Team 2')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
      }  
      else
      {
        return handlerInput.responseBuilder.speak('Welcome To Hack The Machine Team 2. May I have your name please')
        .reprompt('Sorry, I did not get your name please speak again')
        .getResponse();
      }
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      
    },
  };

  module.exports = {
    LaunchRequestHandler
  }