const CompanyInfoHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CompanyInfoIntent';
    },
    handle(handlerInput) {
        let request = handlerInput.requestEnvelope.request.intent
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        return handlerInput.responseBuilder.speak('Ok Got Company Info Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const CEOInfoIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CEOInfoIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got Ceo Info Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const CIOCustomIntentHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'CIOCustomIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Ok Got CIO Custom Intent')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};


module.exports = {
    CompanyInfoHandler,
    CEOInfoIntentHandler,
    CIOCustomIntent
}
