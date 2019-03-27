const LaunchRequestHandler = {

    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder.speak('Welcome To Hack The Machine Team 2')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

  module.exports = {
    LaunchRequestHandler
  }